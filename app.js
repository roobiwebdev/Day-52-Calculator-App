window.onload = () => {
    document.querySelector(".first-btn").style.backgroundColor = "#D03E30";
};

const body = document.body;
const nav = document.querySelector("nav");
const themeSwitch = document.querySelector(".themeSwitch");
const togglerBtns = document.querySelectorAll(".themeSwitch span");
const numDisplay = document.querySelector(".display");
const numsBgColor = document.querySelector(".numbers");
const display = document.querySelector("#input");
let Btns = document.querySelectorAll("button")
const resetBtn = document.querySelector(".reset");
const deleteBtn = document.querySelector(".delete");
const equalsBtn = document.querySelector(".equals");

const colors = {
    bodyBg: ["#3B4664", "#E7E6E7", "#16072A"],
    navTxt: ["#fff", "#393930", "#FDE058"],
    themeSwitchBg: ["#181F32", "#D3CFCF", "#1F0936"],
    themeSwitchBtnBg: ["#D43D33", "#C85401", "#00D9CF"],
    numsBg: ["#242D45", "#D2CCCD", "#1F0936"],
    displayBg: ["#181F32", "#EEEEEE", "#1F0936"],
    eachBtnBg: ["#EAE2DA", "#E5E5E1", "#321A4D"],
    eachBtnHover: ["#FEFFFE", "#FEFFFE", "#6B34AC"],
    eachBtnOut: ["#EAE2DA", "#E5E5E1", "#321A4D"],
    eachBtnTxt: ["#3B4554", "#313126", "#FFE73D"],
    displayTxt: ["#FBFFFF", "#313126", "#FFE73D"],
    resetBtnBg: ["#647299", "#398186", "#56067D"],
    resetBtnTxt: ["#FBFFFF", "#F8FFFE", "#FEFEFE"],
    resetBtnHover: ["#A2B3E1", "#63B4BD", "#8731B1"],
    deleteBtnBg: ["#647396", "#398186", "#56067D"],
    deleteBtnTxt: ["#FBFFFF", "#F8FFFE", "#FEFEFE"],
    deleteBtnHover: ["#A2B3E1", "#63B4BD", "#8731B1"],
    equalsBtnBg: ["#D13E31", "#C85401", "#01DECE"],
    equalsBtnTxt: ["#FBFFFF", "#F8FFFE", "#062D32"],
    equalsBtnHover: ["#F96C5B", "#FF8B38", "#94FEF8"]
};

const applyColors = (index) => {
    body.style.backgroundColor = colors.bodyBg[index];
    nav.style.color = colors.navTxt[index];
    themeSwitch.style.backgroundColor = colors.themeSwitchBg[index];
    numDisplay.style.backgroundColor = colors.displayBg[index];
    display.style.color = colors.displayTxt[index];
    numsBgColor.style.backgroundColor = colors.numsBg[index];
    
    togglerBtns.forEach((btn, i) => {
        btn.style.backgroundColor = i === index ? colors.themeSwitchBtnBg[index] : '';
    });

    Btns.forEach((btn) => {
        btn.style.backgroundColor = colors.eachBtnBg[index];
        btn.style.color = colors.eachBtnTxt[index];
        btn.onmouseover = () => btn.style.backgroundColor = colors.eachBtnHover[index];
        btn.onmouseout = () => btn.style.backgroundColor = colors.eachBtnOut[index];
    });

    [resetBtn, deleteBtn, equalsBtn].forEach((btn, i) => {
        const types = ['resetBtn', 'deleteBtn', 'equalsBtn'];
        btn.style.backgroundColor = colors[`${types[i]}Bg`][index];
        btn.style.color = colors[`${types[i]}Txt`][index];
        btn.onmouseover = () => btn.style.backgroundColor = colors[`${types[i]}Hover`][index];
        btn.onmouseout = () => btn.style.backgroundColor = colors[`${types[i]}Bg`][index];
    });
};

togglerBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => applyColors(index));
});

///Calculating
const formatNumber = (value) => {
    let numberValue = value.replace(/,/g, '');
    
    // Only format numbers with more than three digits
    if (!isNaN(numberValue) && numberValue !== '' && numberValue.indexOf('.') === -1) {
        let formattedNumber = Number(numberValue).toLocaleString();
        display.value = formattedNumber;
    }
}

const appendToDisplay = (value) => {
    display.value += value;
    formatNumber(display.value);
}

const Calculate = () => {
    try {
        let numberValue = display.value.replace(/,/g, '');
        if (numberValue) {
            let result = eval(numberValue);

            if (isNaN(result) || !isFinite(result)) {
                throw new Error("Invalid Calculation");
            }
            display.value = result;
            formatNumber(display.value);
        }
    } catch (error) {
        display.value = 'Error';
    }
}

const Delete = () => {
    display.value = display.value.slice(0, -1);
    formatNumber(display.value);
}

const Reset = () => {
    display.value = "";
}

Btns.forEach(button => {
    button.addEventListener("click", (e) => {
        const btn = e.target;
        const value = btn.dataset.value;

        if (value) {
            if (value === "=") {
                Calculate();
            } else if (value === "DEL") {
                Delete();
            } else if (value === "RESET") {
                Reset();
            } else {
                appendToDisplay(value);
            }
        }
    })
});
