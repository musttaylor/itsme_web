'use strict'

let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs/promises');
let xlsx = require('xlsx')

const NOTI_ROOT_PATH = path.join(__dirname, '../output');
const NOTI_TXT_FILE_NAME = 'noti-reservations.txt';
const NOTI_JSON_FILE_PATH = 'noti-reservations.json';
const NOTI_XLSX_FILE_PATH = 'noti-reservations.xlsx';

checkPath(NOTI_ROOT_PATH)

router.post('/nofi-reservation', async (req, res, next) => {
    try {
        res.send({ result: "success" }).status(200)
        await writeTXTFile(req.body)
        await writeJSONFile(req.body)        
        await writeXLSXFile(req.body)
    }catch(err) {
        console.error(err)
    }    
})

/**
 * @desc 출시 알림 예약 요청 파일을 저장 할 디렉토리 경로 확인
 * 경로가 없는 경우 디렉토리 및 파일 생성
 * @param {String} dirPath 디렉토리 경로
 */
async function checkPath(dirPath) {
    try {
        await fs.access(dirPath)
        console.log(`${dirPath} is exists.`)
    } catch (err) {
        fs.mkdir(dirPath, { recursive: true })
        console.log(`${dirPath} is created.`)
    }
}

/**
 * @desc 파일 유무 확인 
 * 파일이 없는 경우 생성
 * @param {String} filePath 파일 경로
 * @param {String} str 처음 쓰기할 내용
 */
async function checkFile(filePath, str ) {
    return new Promise(async (resolve, reject) => {
        try {                        
            await fs.access(filePath)            
            console.log(`${filePath} is exists.`)
            resolve()
        } catch (err) {            
            try {
                if(str != null) {
                    await fs.writeFile(filePath, str)
                    console.log(`${filePath} is created.`)                                   
                    resolve()             
                }else {
                    reject()
                }                
            } catch (err) {
                console.error('오류', err)
                reject()    
            }
        }            
    })
}

/**
 * @desc txt 파일 생성
 * @param {Object} inputData 사용자 입력값
 */
async function writeTXTFile(inputData) {
    return new Promise(async (resolve, reject) => {
        try {
            let filePath = path.join(NOTI_ROOT_PATH, NOTI_TXT_FILE_NAME)

            await checkFile(filePath, '')

            let data = await fs.readFile(filePath, { encoding: 'utf-8' })
            data += `${inputData.name} ${inputData.telephone} ${inputData.email}\n`

            await fs.writeFile(filePath, data, 'utf-8')
            resolve()
        } catch (err) {
            console.error(err)
            reject()
        }        
    })
}

/**
 * @desc json 파일 생성
 * @param {Object} inputData 사용자 입력값
 */
async function writeJSONFile(inputData) {
    return new Promise(async (resolve, reject) => {
        try {
            let filePath = path.join(NOTI_ROOT_PATH, NOTI_JSON_FILE_PATH)

            await checkFile(filePath, JSON.stringify([]))

            let data = JSON.parse((await fs.readFile(filePath)).toString())
            data.push(inputData)

            await fs.writeFile(filePath, JSON.stringify(data), 'utf-8')
            resolve()
        } catch (err) {
            console.error(err)
            reject(err)
        }        
    })
}

/**
 * @desc xlsx 파일 생성
 * @param {Object} inputData 사용자 입력값
 */
async function writeXLSXFile(inputData) {
    return new Promise(async (resolve, reject) => {
        let filePath = path.join(NOTI_ROOT_PATH, NOTI_XLSX_FILE_PATH)
        
        let workbook
        let workSheet
        let sheetName = 'Sheet 1'

        try {            
            workbook = xlsx.readFile(filePath)
        }catch (err) {                            
            console.log(1)            
            workbook = xlsx.utils.book_new()            
            console.log(2, workbook)
            workSheet = xlsx.utils.json_to_sheet([])
            console.log(3, workSheet)
            xlsx.utils.book_append_sheet(workbook, workSheet, sheetName)
            console.log(4, workbook)
        }finally {                            
            workSheet = workbook.Sheets[sheetName]// 시트 이름에 따른 정보
            console.log(6, workbook)
            let data = xlsx.utils.sheet_to_json(workSheet)// sheet 데이터를 json 타입으로 파싱
            console.log(7, data, inputData)
            data.push(inputData) // 사용자 입력 데이터 추가
            console.log(8, data)
            workbook.Sheets[sheetName] = xlsx.utils.json_to_sheet(data)  // json 데이터를 sheet 타입으로 파싱
            console.log(9, JSON.stringify(workbook))
            await xlsx.writeFile(workbook, filePath)
            console.log(10)
            // ** 결과 데이터 확인
            workbook = xlsx.readFile(filePath) // 파일 다시 읽기            
            console.log(11)
            sheetName = workbook.SheetNames[0] // 첫 번째 시트 이름
            console.log(12)
            workSheet = workbook.Sheets[sheetName] // 시트 이름에 따른 정보
            console.log(13)
            console.log('확인 : ', xlsx.utils.sheet_to_json(workSheet)) // 데이터 출력
            resolve()
        }
    })    
}

module.exports = router;