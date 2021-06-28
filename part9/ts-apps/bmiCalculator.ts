// interface BMIValues {
//     weight: number;
//     height: number;
// }

// const parseArgs = (args: Array <string>): BMIValues => {
//     if (args.length < 4) {throw new Error("Some argument(s) missing");}
//     if (args.length > 4) {throw new Error("Too many arguments entered");}
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//           weight: Number(args[2]),
//           height: Number(args[3])
//         }
//       } else {
//         throw new Error('Wrong type of entries. Please enter numbers');
//       }
//     }

const BMICalculator = (heightData: number, weightData: number): string => {
  const heightSquared: number = (heightData / 100) * (heightData / 100);
  const BMIResult: number = weightData / heightSquared;
  const underweight: string = "Underweight (BMI below 18.5)";
  const normal: string = "normal (healthy weight, BMI between 18.5 and 25)";
  const overweight: string = "Overweight (BMI between 25 and 30)";
  const obese: string = "Obese (BMI between 30 and 40)";
  const severlyObese: string = "Severly Obese (BMI between above 40)";
  const errorMessage: string = "Something went wrong";

  if (BMIResult < 18.5) {
    return underweight;
  } else if (BMIResult >= 18.5 && BMIResult <= 25) {
    console.log(BMIResult);
    console.log(heightData);
    return normal;
  } else if (BMIResult > 25 && BMIResult <= 30) {
    return overweight;
  } else if (BMIResult > 30 && BMIResult <= 40) {
    return obese;
  } else if (BMIResult > 40) {
    return severlyObese;
  } else {
    return errorMessage;
  }
};

export default BMICalculator;
