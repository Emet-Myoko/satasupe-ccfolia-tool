// =========================================================
// サタスペ・亜俠駒変換所
// JavaScript版
// =========================================================


console.log(
    "サタスペ・亜俠駒変換所：JavaScript版 起動"
);


// =========================================================
// キャラクターシートJSONを取得
// =========================================================

async function loadCharacter() {

    const input =
        document.getElementById(
            "character-url"
        );

    const button =
        document.getElementById(
            "load-button"
        );

    const message =
        document.getElementById(
            "load-message"
        );


    // -----------------------------------------------------
    // 入力されたURL
    // -----------------------------------------------------

    const characterUrl =
        input.value.trim();


    // -----------------------------------------------------
    // URLが空の場合
    // -----------------------------------------------------

    if (!characterUrl) {

        message.hidden = false;

        message.textContent =
            "キャラクターシートURLを入力してください。";

        return;
    }


    // -----------------------------------------------------
    // URLからkeyを取得
    // -----------------------------------------------------

    let key = "";

    try {

        const url =
            new URL(characterUrl);

        key =
            url.searchParams.get("key");

    } catch (error) {

        message.hidden = false;

        message.textContent =
            "URLの形式が正しくありません。";

        return;
    }


    // -----------------------------------------------------
    // keyが取得できなかった場合
    // -----------------------------------------------------

    if (!key) {

        message.hidden = false;

        message.textContent =
            "URLからキャラクターシートのkeyを取得できませんでした。";

        return;
    }


    // -----------------------------------------------------
    // 読み込み中
    // -----------------------------------------------------

    button.disabled = true;

    button.textContent =
        "読み込み中…";

    message.hidden = false;

    message.textContent =
        "キャラクターシートを読み込んでいます……";


    // -----------------------------------------------------
    // JSON取得URL
    // -----------------------------------------------------

    const apiUrl =
        "https://character-sheets.appspot.com/" +
        "satasupe/display?ajax=1&key=" +
        encodeURIComponent(key);


    console.log(
        "★ 取得するURL:"
    );

    console.log(
        apiUrl
    );


    // -----------------------------------------------------
    // JSON取得
    // -----------------------------------------------------

    try {

        const response =
            await fetch(apiUrl);


        // HTTPエラー
        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );
        }


        const characterData =
            await response.json();


        // -------------------------------------------------
        // 成功
        // -------------------------------------------------

        console.log(
            "★ キャラクターシートJSON取得成功"
        );

        console.log(
            characterData
        );


        message.textContent =
            "キャラクターシートの読み込みに成功しました。";


        // -------------------------------------------------
        // 現段階では確認のためJSONを保存
        // -------------------------------------------------

        window.characterData =
            characterData;


    } catch (error) {

        console.error(
            "★ キャラクターシート取得エラー"
        );

        console.error(
            error
        );


        message.textContent =
            "キャラクターシートを読み込めませんでした。";


    } finally {

        button.disabled = false;

        button.textContent =
            "読み込む";
    }
}


// =========================================================
// 「読み込む」ボタン
// =========================================================

document
    .getElementById(
        "load-button"
    )
    .addEventListener(
        "click",
        loadCharacter
    );
