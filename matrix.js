'use strict'

class Matrix {

    static add = (matrix1, matrix2) => {
        if ( this.isInvalid(matrix1) || this.isInvalid(matrix2) )
            throw new Error('Invalid matrix, the columns of the matrix must have the same length')

        const rowsCount = matrix1.length === matrix2.length ? matrix1.length: null
        const colsCount = matrix1[0].length === matrix2[0].length ? matrix1[0].length: null

        if (!rowsCount || !colsCount) 
            throw new Error('Invalid matrix, both matrixes must have the same rows and columns to sum')

        const result = Array.from({ length: rowsCount }, () => [])
        for (let i = 0; i < rowsCount; i++)
            for (let j = 0; j < colsCount; j++) 
                result[i][j] = matrix1[i][j] + matrix2[i][j]
        return result
    }

    static subtract = (matrix1, matrix2) => {
        if ( this.isInvalid(matrix1) || this.isInvalid(matrix2) )
            throw new Error('Invalid matrix, the columns of the matrix must have the same length')

        const rowsCount = matrix1.length === matrix2.length ? matrix1.length: null
        const colsCount = matrix1[0].length === matrix2[0].length ? matrix1[0].length: null

        if (!rowsCount || !colsCount) 
            throw new Error('Invalid matrix, both matrixes must have the same rows and columns to subtract')

        const result = Array.from({ length: rowsCount }, () => [])
        for (let i = 0; i < rowsCount; i++)
            for (let j = 0; j < colsCount; j++) 
                result[i][j] = matrix1[i][j] - matrix2[i][j]
        return result
    }

    static multiply = (matrix1, matrix2) => {
        if ( !this.isInvalid(matrix2) && !isNaN(matrix1) || !isNaN(matrix1[0]) ) {
            const matrix = [...matrix2]
            const number = !isNaN(matrix1) ? matrix1: matrix1[0]
            for (let i = 0; i < matrix.length; i++) 
                for (let j = 0; j < matrix.length; j++) 
                    matrix[i][j] *= number
            return matrix
        }
        if ( this.isInvalid(matrix1) || this.isInvalid(matrix2) )
            throw new Error('Invalid matrix, the columns of the matrix must have the same length')
        if (matrix1[0].length !== matrix2.length)
            throw new Error('Invalid matrix row/column length, the length of the columns of the first matrix must be equal to the length of the second row')

        const rowsCount = matrix1.length
        const colsCount = matrix2[0].length
        const result = Array.from({ length: rowsCount }, () => Array.from({ length: colsCount }, () => null))

        for (let i = 0; i < rowsCount; i++) 
            for (let j = 0; j < colsCount; j++) 
                for (let n = 0; n < matrix1[i].length; n++ ) 
                    result[i][j] += matrix1[i][n] * matrix2[n][j]
        return result
    }

    static power = (matrix, power, poweredMatrix = matrix) => {
        if (power > 0) {
            if (power-1) return this.power( matrix, power-1, this.multiply(matrix, poweredMatrix) )
            else return poweredMatrix
        // FIXME: negative power
        } else throw new Error('Negative power doesn\'nt support yet')
    }

    static isInvalid = (matrix) => matrix.some(row => row.length  !== matrix[0].length)

    static getLongestLength = (matrix) => Math.max(...[
        ...matrix.reduce((arr, row) => 
            arr = [ ...arr, ...row.reduce((a, n) => 
                a = [...a, `${n}`.length], []) ], []), 
    ])

    static table = (matrix) => {
        if (!matrix) return ''
        const space = 3
        const table = matrix.reduce((str, row) => str += `|${''.padStart(space)}${
            row.reduce((s, n) => s += `${n < 0 ? n: ' ' + n}${''.padStart(space)}${ ''.padStart( this.getLongestLength(matrix) - `${n}`.length - (n < 0 ? 0: 1) ) }`, '')
        }|\n`, '')
        return ` ${''.padEnd(table.split('\n')[0].length-2, '_')} \n|${''.padEnd(table.split('\n')[0].length-2, ' ')}| \n${table}|${''.padEnd(table.split('\n')[0].length-2, '_')}|`
    }

    static random = (min = 0, max = 1) => Math.floor(Math.random() * (max - min+1) + min)
    
    static generate = (m, n) => {
        const rowsCount = m || this.random(1, 4)
        const colsCount = n || this.random(1, 4)
        const matrix = Array.from({ length: rowsCount }, () => Array.from({ length: colsCount }, () => null))

        for (let i = 0; i < rowsCount; i++) 
            for (let j = 0; j < colsCount; j++) 
                matrix[i][j] = this.random(-9, 9)
        return matrix
    }

}

const random = (min = 0, max = 1) => Math.floor(Math.random() * (max - min+1) + min)

const a = Matrix.generate(3, 3)
const b = Matrix.generate(3, 3)

console.log( '\nGenerated matrixes:\n', Matrix.table( a ), '\n', Matrix.table( b ) )
console.log( '\nAdd:\n', Matrix.table( Matrix.add(a, b) ), '\n' )
console.log( '\nSubtract:\n', Matrix.table( Matrix.subtract(a, b) ), '\n' )
console.log( '\nMultiply:\n', Matrix.table( Matrix.multiply(a, b) ), '\n' )
