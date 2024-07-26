/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import Api from '../tools/api';
import { compose, tap } from 'ramda';

const api = new Api();

const processSequence = async ({ value, writeLog, handleSuccess, handleError }) => {
    try {
        writeLog(value);
        const newValue = value.trim();

        const isValid = (val) => {
            const isNumber = val.split('').every((ch) => ch >= '0' && ch <= '9' || ch === '.');
            return val.length < 10 && val.length > 2 && parseFloat(val) > 0 && isNumber;
        };

        if (!isValid(newValue)) {
            throw new Error('ValidationError');
        }

        const getNumberBase = async (number) => {
            const numberBaseUrl = 'https://api.tech/numbers/base';
            const baseParams = { from: 10, to: 2, number };
            const response = await api.get(numberBaseUrl, baseParams);
            return response.result;
        };

        const roundedNumber = compose(
            tap(writeLog),
            Math.round,
            parseFloat
        )(newValue);

        const baseResult = await getNumberBase(roundedNumber);

        const calculateId = compose(
            (value) => value % 3,
            tap(writeLog),
            (value) => Math.pow(value, 2),
            tap(writeLog),
            (value) => value.length,
            tap(writeLog)
        );

        const id = calculateId(baseResult);
        const animalBaseUrl = `https://animals.tech/${id}`;

        const animalResponse = await api.get(animalBaseUrl)({});
        handleSuccess(animalResponse.result);
    } catch (error) {
        handleError(error.message || 'UnknownError');
    }
};

export default processSequence;
