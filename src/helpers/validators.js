/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {allPass, propEq, filter, equals} from 'ramda';

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    const isStar = propEq('star', 'red');
    const isSquare = propEq('square', 'green');
    const isTriangle = propEq('triangle', 'white');
    const isCircle = propEq('circle', 'white');
    const isValidateFieldN1 = allPass([isTriangle, isCircle, isStar, isSquare]);
    return isValidateFieldN1({star, square, triangle, circle});
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({star, square, triangle, circle}) => {
    const isGreen =  equals('green');
    const lengthOfGreen = filter(isGreen,[star,square,triangle,circle]).length;
    return lengthOfGreen >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({star, square, triangle, circle}) => {
    const isRed = equals('red');
    const isBlue = equals('blue');
    const figures = [star, square, triangle, circle];
    const lengthOfReds = filter(isRed,figures).length;
    const lengthOfBlue = filter(isBlue,figures).length;
    return lengthOfBlue === lengthOfReds;
};
// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({star, square, triangle, circle}) => {
    const isStar = propEq('star', 'red');
    const isSquare = propEq('square', 'orange');
    const isCircle = propEq('circle', 'blue');
    const isValidateFieldN4 = allPass([isStar, isSquare, isCircle]);
    return isValidateFieldN4({star,square,circle});
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({star, square, triangle, circle}) => {
    const isRed = equals('red');
    const isBlue = equals('blue');
    const isGreen = equals('green');
    const isOrange = equals('orange');
    const figures = [star,square,triangle,circle];
    const lengthOfReds = filter(isRed,figures).length;
    const lengthOfBlue = filter(isBlue,figures).length;
    const lengthOfGreen = filter(isGreen,figures).length;
    const lengthOfOrange = filter(isOrange,figures).length;
    return lengthOfReds >= 3 || lengthOfBlue >= 3 || lengthOfGreen >= 3 || lengthOfOrange >= 3;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({star, square, triangle, circle}) => {
    const isRed = equals('red');
    const isGreen = equals('green');
    const isStar = propEq('star', 'green');
    const figures = [star,square,triangle,circle];
    const lengthOfGreen = filter(isGreen,figures).length;
    const lengthOfReds = filter(isRed,figures).length;
    return lengthOfGreen === 2 && isStar({star}) && lengthOfReds === 1;
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({star, square, triangle, circle}) => {
    const isStar = propEq('star', 'orange');
    const isSquare = propEq('square', 'orange');
    const isTriangle = propEq('triangle', 'orange');
    const isCircle = propEq('circle', 'orange');
    const isValidateFieldN7 = allPass([isTriangle, isCircle, isStar, isSquare]);
    return isValidateFieldN7({star, square, triangle, circle});
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({star}) => {
    const isStarRed = propEq('star', 'red');
    const isStarWhite = propEq('star', 'white');
    return !isStarRed({star}) && !isStarWhite({star});
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({star, square, triangle, circle}) => {
    const isStar = propEq('star', 'green');
    const isSquare = propEq('square', 'green');
    const isTriangle = propEq('triangle', 'green');
    const isCircle = propEq('circle', 'green');
    const isValidateFieldN7 = allPass([isTriangle, isCircle, isStar, isSquare]);
    return isValidateFieldN7({star, square, triangle, circle});
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({square, triangle}) => {
    return triangle === square && triangle !== 'white';
};
