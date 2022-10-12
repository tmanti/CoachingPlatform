const prices = [8,8,8,8.5,9.5,10.5,12.5,12.5,12.5,13.5,13.5,13.5,16.5,18,20,30,35,42.5,53,60.5,79.5,97.5,135];

export default function calculatePrice(start : number, end : number) :  number {
    let price = 0;
    if(start > end || start < 0 || end >= prices.length) return -1;

    for(let i = start; i < end; i++){
        price += prices[i] ?? 0;
    }

    return price;
}