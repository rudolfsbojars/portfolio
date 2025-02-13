#include <arrays/arrayobj.mqh>
#include <chartobjects/chartobjectstxtcontrols.mqh>
#include <chartobjects/chartobjectsshapes.mqh>

class CZone : public CObject {
public:
   double high;
   double low;
   int ticks;

   virtual int Compare(const CObject *node, const int mode=0) const {
      const CZone* other = (CZone*)node;
      return other.ticks - ticks;
   }
};

input int Zones = 10;
input ENUM_TIMEFRAMES timeframe = PERIOD_D1;
input int candlesstart = 0;
input int candles = 1;



int barstotal;

CArrayObj chartObjects;

int OnInit(){
   
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason){
   if(REASON_REMOVE == reason || REASON_PARAMETERS == reason){
      ObjectsDeleteAll(0); 
      barstotal = 0;
   }
}

void OnTick(){
   int bars = iBars(_Symbol,timeframe);
   if(bars != barstotal){
      barstotal = barstotal;
      
      datetime timeEnd = iTime(_Symbol,timeframe,candlesstart);
      datetime timeStart = iTime(_Symbol,timeframe,candles + candlesstart);
      
      MqlTick ticks[];
      CopyTicksRange(_Symbol,ticks,COPY_TICKS_ALL,timeStart*1000,timeEnd*1000);
      
      double highs[];
      CopyHigh(_Symbol,PERIOD_CURRENT,timeStart,timeEnd,highs);
      double high = highs[ArrayMaximum(highs)];
      
      double lows[];
      CopyLow(_Symbol,PERIOD_CURRENT,timeStart,timeEnd,lows);
      double low = lows[ArrayMinimum(lows)];
      
      double size = high - low;
      
      CArrayObj zones;
      
      int count = Zones;
      
      for(int i = 0; i < count; i++){
         double h = high - size * i / count;
         double l = high - size * (i+1) / count;
         
         CZone* zone = new CZone();
         zone.high = h;
         zone.low = l;
         zones.Add(zone);
      }
      
      for(int i = 0; i < ArraySize(ticks); i++){
         for(int j = 0; j < zones.Total(); j++){
            CZone* zone = zones.At(j);
            
            if(ticks[i].bid >= zone.low && ticks[i].bid <= zone.high){
               zone.ticks++;
               break;
            }
         }
      }
      
      zones.Sort();
      chartObjects.Clear();
      for(int i = 0; i < zones.Total(); i++){
         CZone* zone = zones.At(i);
         
         string objName = "Zone "+IntegerToString(i);
         
         CChartObjectRectangle* rect = new CChartObjectRectangle();
         rect.Create(0,objName,0,timeStart,zone.high,timeEnd,zone.low);
         rect.Fill(true);
         
         if(zone.ticks > ArraySize(ticks) * 0.15){
            rect.Color(clrOrangeRed);
         }else if(zone.ticks > ArraySize(ticks) * 0.10){
            rect.Color(clrTomato);
         }else if(zone.ticks > ArraySize(ticks) * 0.05){
            rect.Color(clrSandyBrown);
         }else{
            rect.Color(clrLightGray);
         }
         
         CChartObjectLabel* lable = new CChartObjectLabel();
         lable.Create(0,objName+"Lable",0,timeStart,zone.high);
         lable.Color(clrWhite);
         lable.Description(DoubleToString((double)zone.ticks/ArraySize(ticks)*100,2)+"%");
         
         chartObjects.Add(rect);
         chartObjects.Add(lable);
      }
   }
   
}
