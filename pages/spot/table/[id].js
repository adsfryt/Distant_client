import React, {useState} from 'react';
import styles from "../../../styles/Spot/Spot.module.css"
import Title from "../../../components/Title";
import List from "../../../components/spot/list";
import Table from "../../../components/spot/table/Table";
import ExcelJS from 'exceljs';
import { saveAs } from "file-saver";

function ToDateStr(date) {
    let createDate = new Date(date);
    var createDate_str = createDate.getFullYear() + ".";
    createDate_str += (createDate.getMonth() + 1) < 10 ? "0" + (createDate.getMonth() + 1) + "." : (createDate.getMonth() + 1) + ".";
    createDate_str += createDate.getDate() < 10 ? "0" + createDate.getDate() + " " : createDate.getDate() + " ";
    createDate_str += createDate.getHours() < 10 ? "0" + createDate.getHours() + ":" : createDate.getHours() + ":";
    createDate_str += createDate.getMinutes() < 10 ? "0" + createDate.getMinutes() : createDate.getMinutes();
    return createDate_str;
}

var isFinal = false;
const Tablep = ({post_s, post_full_s, password, ADDRESS_SITE, ADDRESS_SERVER}) => {
    var [post, setpost] = useState(post_s);
    var [post_full, setpost_full] = useState(post_full_s);

    var [CurPage, setCurPage] = useState("Table");
    function setF(){
        isFinal = true;
    }

    async function AddURL(name) {
        try {
        if(name.replaceAll(" ","") !== ""){
            var postData = {
                testId: post.testId,
                name: name,
                password: password,
            };

            var response = await fetch(ADDRESS_SERVER + "/admin/add_link", {  // check
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            });
            var response_j = await response.json();
            if(response_j){
                var Alltest = await fetch(ADDRESS_SERVER + `/admin/get_All?testId=`+ post.testId + `&` + `password=` + password);
                var Alltest_j = await Alltest.json();
                setpost(Alltest_j.post);
                setpost_full(Alltest_j.post_full);
            }
        }
        }catch (e) {
            console.log(e)
        }
    }

    function saveFile() {
        const excel = new ExcelJS.Workbook();
        excel.creator = 'I';
        excel.lastModifiedBy = 'me';
        excel.created = new Date(1985, 8, 1);
        excel.modified = new Date();
        excel.lastPrinted = new Date(2023, 4, 1);
        var sheet = excel.addWorksheet('My Sheet');
        sheet.columns = [
            { header: 'Имя', key: 'name', width: 20 },
            { header: 'Код', key: 'id', width: 50 },
            { header: 'Время начала', key: 'start', width: 30 },
            { header: 'Время выполнения', key: 'time', width: 30 },
            { header: 'Время окончания', key: 'end', width: 30 },
            { header: 'Количество баллов', key: 'point', width: 30 }
        ];
        for (let i = 0; i < post_full.urlGuests.length; i++) {
            var name = post_full.urlGuests[i][1];
            var code = "A-" + post.testId + "-" +post_full.urlGuests[i][0];
            let start_str;
            let start;
            var end_sh;
            for (let i1 = 0; i1 < post_full.started.length; i1++) {
                if (post_full.started[i1][0] === post_full.urlGuests[i][0]) {
                    start = new Date(post_full.started[i1][1]);
                    end_sh = new Date((new Date(post_full.started[i1][1])).getTime() + (post.timeS*1000));
                    start_str = ToDateStr(post_full.started[i1][1]);
                    break;
                }
            }
            if(start_str === undefined){
                sheet.addRow({name: name, id: code, start: "-", time:"-", end:"-", point:"-"});
            }else{
                var end_str;
                var end;
                var Ispassed = false;
                for (let i1 = 0; i1 < post_full.passed.length; i1++) {
                    if (post_full.passed[i1][0] === post_full.urlGuests[i][0]) {
                        end =  new Date(post_full.passed[i1][1]);
                        end_str = ToDateStr(post_full.passed[i1][1]);
                        Ispassed = true;
                        break;
                    }
                }
                if(!Ispassed){
                    sheet.addRow({name: name, id: code, start: start_str, time:"-", end:"-", point:"-"});
                }else {
                    var points = 0;
                    for (let i1 = 0; i1 < post_full.userResult.length; i1++) {
                        if(post_full.userResult[i1].URLs === post_full.urlGuests[i][0]){
                            for (let j = 0; j < post_full.userResult[i1].answer.length; j++) {
                                points += post_full.userResult[i1].answer[j].result;
                            }
                            break;
                        }
                    }
                    var points_str = String(points)
                        var time = Math.round((end.getTime() - start.getTime()) / 1000) + " секунд";
                        sheet.addRow({name: name, id: code, start: start_str, time:time, end:end_str, point:points_str});

                }
            }
        }

        excel.xlsx.writeBuffer().then(function(buffer) {

            const blob = new Blob([buffer], { type: "application/xlsx" });
            saveAs(blob, "myexcel.xlsx");
        });
    }

    return (
        <div className={styles.Content}>
            <Title name={post.title}/>
            <List CurPage={CurPage} testId={post.testId} password={password}/>
            <p className={styles.title_text}>Таблица участников:</p>
            <Table  ADDRESS_SITE={ADDRESS_SITE} ADDRESS_SERVER={ADDRESS_SERVER} AddURL={AddURL} setF={setF} isFinal={isFinal} password={password} testId={post.testId} time={post.timeS} userAnswer={post_full.userAnswer} userResult={post_full.userResult} passed={post_full.passed} started={post_full.started} urlGuests={post_full.urlGuests}/>
            <p onClick={saveFile} className={styles.text_download} id={"download_table"}>Скачать таблицу в формате Excel</p>
        </div>
    );
};

export default Tablep;

export async function getServerSideProps({params}) {

    var response = await fetch(`http://localhost:5000/admin/get_All?testId=`+ params.id.substr(0, 18) + `&` + `password=` + params.id.substr(19, 30));
    var {post, post_full} = await response.json();
    var password = params.id.substr(19, 30);
    console.log(post)
    if(post === undefined){
        return{
            notFound: true,
        }
    }
    var post_s = post;
    var post_full_s = post_full;
    var ADDRESS_SITE = process.env.ADDRESS_SITE;
    var ADDRESS_SERVER = process.env.ADDRESS_SERVER;
    return{
        props: {post_s, post_full_s, password, ADDRESS_SITE, ADDRESS_SERVER},
    }
}