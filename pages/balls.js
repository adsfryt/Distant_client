import React, {useEffect, useState} from 'react';
import style from "../styles/Ball.module.css";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Balls = () => {
    var [count, setCount] = useState(0);
    var [fi, setfi] = useState(false);
    var play = 0;
    var matrix = [];

    var play_interval;

    function fill(c){
        matrix = [];

        for (let i = 0; i < c; i++) {
            matrix.push([(Math.round(Math.random()*10000))/10,(Math.round(Math.random()*10000))/10,0,0]);
            const para = document.createElement("div");
            para.id = "q" + i;
            para.className = style.ball;
            para.style.top = matrix[i][1] + "px";
            para.style.left = matrix[i][0] + "px";
            document.getElementById("playground").appendChild(para);
        }
        console.log(matrix)
    }
    useEffect(()=>{
        document.getElementById("playground").innerHTML = '';
        fill(count);
        console.log(count)
    },[count]);

    // useEffect(()=>{
    //     while(play){
    //         for (let i = 0; i < matrix.length; i++) {
    //             var Force = [0, 0];
    //             for (let j = 0; j < matrix.length; j++) {
    //                 if (j !== i) {
    //                     var force_l;
    //                     var dx = matrix[j][0] - matrix[i][0];
    //                     var dy = matrix[i][1] - matrix[j][1];
    //                     var dxy = Math.floor(Math.sqrt(Math.pow(dx, 2) + (Math.pow(dy, 2))) * 1000) / 1000;
    //                     force_l = 0.0000000000667 * (1000000) / (dxy);
    //                     var force_x = force_l * dx / dxy;
    //                     var force_y = force_l * dy / dxy;
    //                     Force[0] = Force[0] + force_x;
    //                     Force[1] = Force[1] + force_y;
    //                 }
    //             }
    //             if (Force[0] > 0.000001){
    //                 Force[0] = 0.000001;
    //             }
    //             if (Force[0] < -0.000001){
    //                 Force[0] = -0.000001;
    //             }
    //             if (Force[1] > 0.000001){
    //                 Force[1] = 0.000001;
    //             }
    //             if (Force[1] < -0.000001){
    //                 Force[1] = -0.000001;
    //             }
    //             matrix[i][2] = matrix[i][2] + Math.floor(Force[0] * 1000000000000000) / 10000000000;
    //             matrix[i][3] = matrix[i][3] + Math.floor(Force[1] * 1000000000000000) / 10000000000;
    //
    //             matrix[i][0] = matrix[i][0] + matrix[i][2];
    //             matrix[i][1] = matrix[i][1] - matrix[i][3];
    //
    //             var el = document.getElementById("q" + i);
    //             el.style.top = matrix[i][1] + "px";
    //             el.style.left =  matrix[i][0] +"px";
    //         }
    //     }
    //     setfi(!fi);
    // }, [fi]);

    async function f() {
        play = 2;

        while(play){

            for (let i = 0; i < matrix.length; i++) {
                var Force = [0, 0];
                for (let j = 0; j < matrix.length; j++) {
                    if (j !== i) {
                        var force_l;
                        var dx = matrix[j][0] - matrix[i][0];
                        var dy = matrix[i][1] - matrix[j][1];
                        var dxy = Math.floor(Math.sqrt(Math.pow(dx, 2) + (Math.pow(dy, 2))) * 1000) / 1000;
                        force_l = 0.0000000000667 * (1000000) / (dxy);
                        var force_x = force_l * dx / dxy;
                        var force_y = force_l * dy / dxy;
                        Force[0] = Force[0] + force_x;
                        Force[1] = Force[1] + force_y;
                    }
                }
                if (Force[0] > 0.000001){
                    Force[0] = 0.000001;
                }
                if (Force[0] < -0.000001){
                    Force[0] = -0.000001;
                }
                if (Force[1] > 0.000001){
                    Force[1] = 0.000001;
                }
                if (Force[1] < -0.000001){
                    Force[1] = -0.000001;
                }
                matrix[i][2] = matrix[i][2] + Math.floor(Force[0] * 1000000000000000) / 10000000000;
                matrix[i][3] = matrix[i][3] + Math.floor(Force[1] * 1000000000000000) / 10000000000;

                matrix[i][0] = matrix[i][0] + matrix[i][2];
                matrix[i][1] = matrix[i][1] - matrix[i][3];

                var el = document.getElementById("q" + i);
                el.style.top = matrix[i][1] + "px";
                el.style.left = matrix[i][0] + "px";

            }
            await sleep(20);

        }


    }

    function stop() {
        clearInterval(play_interval);
        setCount(count);
        play = 0;
    }

    return (
        <div>
            <input onChange={(e) => {if(play === 0){setCount(parseInt(e.target.value === "" ? 0 : e.target.value)); }}} />
            <button onClick={()=>{if(play === 0 ){f()}}}>play</button>
            <button onClick={stop}>stop</button>
            <div id={"playground"}> </div>
        </div>
    );
};

export default Balls;