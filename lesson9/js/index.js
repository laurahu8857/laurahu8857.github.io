//$ function 會等document ready後會開始跑
// $ 是jquery的fuction , document.getElementID.get(XXX)
// 匿名函式

// element取值
let name;
let email;
let phone;
let bdy;
let bdm;
let bdd;
let gender;
let games;
let note;
// let 是可以再更改值的宣告 const 不能再更改值的宣告
const fireBaseData = firebase.database().ref("register");

$(function(){
    // send btn 
    $("#send").click(function(e){send(e);});
}
)

function send(e)
{
    // 瀏覽器 default行為： form 按下btn時會reload, 這邊是避免reload發生
   e.preventDefault();

   let allpass = true
    //重按send時 ,把原本error class （error message) 移除   
   $(".is-invalid").removeClass("is-invalid");
   $("#check_games_invalid").hide();

    name = $("#input_name").val();
    email = $("#input_email").val();
//     簡單的檢查, 判斷email字串中 “@” 的位置是多少，如果回傳-1就代表沒有這個字串
//     let result = email.indexOf("@");
    let patt;
    let result;
    phone = $("#input_phone").val();
    bdy = $("#sel_bdy").val();
    bdm = $("#sel_bdm").val();
    bdd = $("#sel_bdd").val();
    gender = $("input[name='radio_gender']:checked").val();
    games = [];
    $.map($("input[name='check_games']:checked"), function (el) {
        games.push($(el).val())
        })
    note = $("#text_note").val();

   console.log("=====after click button===")
   console.log("name is: " + name);
   console.log("email is: " + email);
   console.log("bd is: " + bdy + "-" + bdm + "-" + bdd);
   console.log("gender is: " + gender);
   console.log("games is: " + games);
   console.log("note is: " + note);


//    判斷 name is "", 給warning word
   if (name=="")
   {
       $("#input_name").addClass("is-invalid");
       allpass = false;
   }
//    判斷 email is "" 或是 email不符合格式, 給warning word
   patt = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/i;
   result = patt.test(email);
   if (email==""||!result)
   {
       $("#input_email").addClass("is-invalid");
       allpass = false;
   }

//    手機號碼的檢查
   patt = /^09[0-9]{8}/i;
   result = patt.test(phone);

   if(phone==""||!result)
   {
        $("#input_phone").addClass("is-invalid");
        allpass = false;
   }
   if(bdy=="")
   {
        $("#sel_bdy").addClass("is-invalid");
        allpass = false;
   }

   if(bdm=="")
   {
        $("#sel_bdm").addClass("is-invalid");
        allpass = false;
   }
   
   if(bdd=="")
   {
        $("#sel_bdd").addClass("is-invalid");
        allpass = false;      
   }
   if(games.length==0){
        $("input[name='check_games']").addClass("is-invalid");

        // 因為bootrap 一個error 只能for 一個element,但多選是多個element
        // 所以只能強制讓這一行show 出來
        $("#check_games_invalid").show();
   }

    if(!allpass) return;
    fireBaseData.push(
        {
        name: name,
        bd: bdy+"/"+bdm+"/"+bdd,
        gender: gender,
        email: email,
        phone: phone,
        //tostring->陣列改成字串
        games: games.toString(), 
        note:note,
        time: firebase.database.ServerValue.TIMESTAMP
    },
    function (error) {
    if (error) {
    alert('系統出現問題，請稍後再試。');
    } else {
    alert('我們已收到您的訊息，將會有專人與您聯繫。');
    }
    });

}


