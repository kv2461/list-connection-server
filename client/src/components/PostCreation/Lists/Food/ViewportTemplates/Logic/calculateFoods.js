// export const calculateFoodStats = ( ingredientItem, setIngredientItem ) => {
//     const { amount:weight } = ingredientItem?.weightPerServing;      
//     const amount = ingredientItem?.amount;
//     const amountUnit = ingredientItem?.amountUnit;
//     const caloriesPerServing = ingredientItem?.caloriesPerServing[0].amount;
//     const fatPerServing = ingredientItem?.fatPerServing[0].amount;
//     const proteinPerServing = ingredientItem?.proteinPerServing[0].amount;
//     const carbsPerServing = ingredientItem?.carbsPerServing[0].amount;

//     let calculatedGrams = 0;
//     let calculable = ingredientItem?.calculable
//     let calculatedCarbs = 0;
//     let calculatedFat = 0;
//     let calculatedProtein = 0;
//     let calculatedCalories = 0;

//     switch(amountUnit) {
//         case 'g':
//             calculatedGrams = amount;
//             break;
//         case 'oz':
//         case 'ounce':
//         case 'fluid ounce':
//             calculatedGrams = amount*28.3495; 
//             break;
//         case 'quart':
//             calculatedGrams = amount*28.3496*32;
//             break;
//         case 'cup':
//             calculatedGrams = amount*28.3496*32*4;
//             break;
//         case 'serving':
//             calculatedGrams = amount*weight;
//             break;
//         case 'teaspoon':
//             calculatedGrams = amount*4.2
//             break;
//         case 'tablespoon':
//             calculatedGrams = amount*14.3;
//             break;
//         default:
//             calculatedGrams = 0;
//             calculable = false;
//             break;
//     }

//     if (calculable === true) {

//         let ratio = calculatedGrams/weight
//         calculatedCarbs = (carbsPerServing*ratio).toFixed(2);
//         calculatedFat = (fatPerServing*ratio).toFixed(2);
//         calculatedProtein = (proteinPerServing*ratio).toFixed(2);
//         calculatedCalories = (caloriesPerServing*ratio).toFixed(2);

//         setIngredientItem({
//             ...ingredientItem, 
//             calculable: calculable, 
//             calculatedCarbs: calculatedCarbs, 
//             calculatedProtein:calculatedProtein, 
//             calculatedFat: calculatedFat, 
//             calculatedGrams: calculatedGrams,
//             calculatedCalories: calculatedCalories
//         })
//     }
// }