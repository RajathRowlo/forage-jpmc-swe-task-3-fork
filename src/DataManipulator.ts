import { ServerRespond } from './DataStreamer';

export interface Row {
  priceA: number,
  priceB: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceStockA = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2;
    const priceStockB = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price)/2;
    const ratio = priceStockA/priceStockB;
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;

    return {
      priceA : priceStockA,
      priceB : priceStockB,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined
    }
    // return serverResponds.map((el: any) => {
    //   return {
    //     stock: el.stock,
    //     top_ask_price: el.top_ask && el.top_ask.price || 0,
    //     timestamp: el.timestamp,
    //   };
    // })
  }
}
