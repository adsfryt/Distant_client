class Prepare {
    pTest(key1){
        var key ={...key1};
        delete key.check;
        var Variant = key.variant;
        for (let i = 0; i < Variant.length; i++) {
            Variant[i].id = i;
        }
        key.Variants = Variant;
        delete key.variant;
        delete key.answer;
        return key;
    }
    Test(key1){
        var key ={...key1};
        delete key.variant;
        delete key.description;
        delete key.title;

        var answer = key.answer;
        for (let i = 0; i < answer.length; i++) {
            for (let i1 = 0; i1 < answer[i].length; i1++) {
                answer[i][i1].ids = i1;
            }
        }
        key.answers = answer;
        delete key.answer;
        return key;
    }

    pAnswer(key1){
        var key ={...key1};
        delete key.check;
        var Variant = key.variant;
        for (let i = 0; i < Variant.length; i++) {
            Variant[i].id = i;
        }
        key.Variants = Variant;
        delete key.variant;
        delete key.answer;
        delete key.intDistant;
        return key;
    }
    Answer(key1){
        var key ={...key1};
        delete key.variant;
        delete key.description;
        delete key.title;

        var answer = key.answer;
        for (let i = 0; i < answer.length; i++) {
            for (let i1 = 0; i1 < answer[i].length; i1++) {
                answer[i][i1].ids = i1;
            }
        }
        key.answers = answer;
        delete key.answer;
        return key;
    }
}
export default Prepare;