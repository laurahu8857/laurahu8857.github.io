//$ function 會等document ready後會開始跑
// $ 是jquery的fuction , document.getElementID.get(XXX)
// 匿名函式

// element取值
let name;
let email;
let bdy;
let bdm;
let bdd;
let gender;
let games;
let note;

$(function(){
    
    // text name
    // element賦值
    $("#input_name").val('李小華');
    // element取值
    name = $("#input_name").val();

    console.log("name is:" +name);
    
    // text email
    // element賦值
    $("#input_email").val('happy@gmail.com');
    // element取值
    email = $("#input_email").val();

    console.log("email is:" +email);

    // 年月日 下拉式選單, val(1983)是去找原本在html 設定的值，如果沒有那個值會出現error
    // 年
    $("#sel_bdy").val("1983");
    bdy = $("#sel_bdy").val();
    
    // 月
    $("#sel_bdm").val("2");
    bdm = $("#sel_bdm").val();

    // 日
    $("#sel_bdd").val("20");
    bdd = $("#sel_bdd").val();

    console.log("bd is :" +bdy+"/"+bdm+"/"+bdd);

    // radio 性別
    $("input[name='radio_gender'][value='f']").prop("checked",true);
    gender = $("input[name='radio_gender']:checked").val();
    console.log("gender is :"+gender);

    // checkbox 比賽組別
    // 用id 賦值
    $("#check_games_1").prop("checked", true);
    // 用checlbox 賦值
    $("input[name='check_games'][value='2']").prop("checked", true);
    //checkbox取值
    let games = []
    $.map($("input[name='check_games']:checked"), function (el) {
    games.push($(el).val())
    })
    console.log("games is: " + games);


    //textarea賦值
    $("#text_note").val('Hi!必勝');
    //textarea取值
    let note = $("#text_note").val();
    console.log("note is: " + note);

    // send btn 
    $("#send").click(function(e){send(e);});
}
)

function send(e)
{
    // 瀏覽器 default行為： form 按下btn時會reload, 這邊是避免reload發生
   e.preventDefault();

    name = $("#input_name").val();
    email = $("#input_email").val();
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
}
