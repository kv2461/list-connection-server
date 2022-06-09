export const calculateFoodStats = (ingredientItem, setIngredientItem) => {
    const {key} = ingredientItem
    const {percentCarbs, percentFat, percentProtein} = ingredientItem?.caloricBreakdown;
    const {amount:weight, unit: weightUnit} = ingredientItem?.weightPerServing;      
    const {value} = ingredientItem?.estimatedCost;
    const dollarValueNumber = Number((value*.01).toFixed(2));
    const amount = ingredientItem?.amount;
    const amountUnit = ingredientItem?.amountUnit;
    let calculatedGrams = 0;
    let calculable = ingredientItem?.calculable

    let calculatedCarbs = 0;
    let calculatedFat = 0;
    let calculatedProtein = 0;
    let calculatedCost = 0;

    switch(amountUnit) {
        case 'g':
            calculatedGrams = amount;
            break;
        case 'oz':
        case 'ounce':
        case 'fluid ounce':
            calculatedGrams = amount*28.3495; 
            break;
        case 'quart':
            calculatedGrams = amount*28.3496*32;
            break;
        case 'cup':
            calculatedGrams = amount*28.3496*32*4;
            break;
        case 'serving':
            calculatedGrams = amount*weight;
            break;
        case 'teaspoon':
            calculatedGrams = amount*4.2
            break;
        case 'tablespoon':
            calculatedGrams = amount*14.3;
            break;
        default:
            calculatedGrams = 0;
            calculable = false;
            break;
    }

    if (calculable === true) {
        calculatedCarbs = (percentCarbs*.01)*calculatedGrams;
        calculatedFat = (percentFat*.01)*calculatedGrams;
        calculatedProtein = (percentProtein*.01)*calculatedGrams;
        calculatedCost = (calculatedGrams/weight)*dollarValueNumber;
    }

    

    // console.table([
    //     `calculatedCost = ${calculatedCost}`,
    //     `calculatedFat = ${calculatedFat}`,
    //     `calculatedProtein = ${calculatedProtein}`,
    //     `calculatedCarbs = ${calculatedCarbs}`,
    //     `key = ${key}`,
    //     `calculable = ${calculable}`,
    //     `percentCarbs = ${percentCarbs}`,
    //     `percentFat = ${percentFat}`,
    //     `percentProtein = ${percentProtein}`, 
    //     `weight = ${weight}`, 
    //     `weightUnit = ${weightUnit}`, 
    //     `amount = ${amount}`, 
    //     `amountUnit = ${amountUnit}`, 
    //     `dollarValueNumber = ${dollarValueNumber}`,
    //     `calculatedGrams = ${calculatedGrams}`
    // ])


    setIngredientItem({...ingredientItem, calculable:calculable, calculatedGrams: calculatedGrams, calculatedCarbs: calculatedCarbs, calculatedProtein:calculatedProtein, calculatedCost:calculatedCost })
 
}