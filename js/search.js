
function getTodayDate() {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  month = month.toString();
  year = year.toString();
  day = day.toString();

  if (month.length == 1) {
    month = "0" + month;
  }

  if (day.length == 1) {
    day = "0" + day;
  }
  return year + month + day;
}

document.getElementById("searchStockBtn").onclick = function () {
  let stockNum = document.getElementById("searchStock").value;
  
  date = getTodayDate();
  
  fetch(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${stockNum}`)
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((stocks) => {
      
      let container = document.getElementById("result");
      container.innerHTML = "";
      let h1 = document.createElement("h1")
      let title = document.createTextNode(stocks.title);
      h1.style.textAlign = "center"
      h1.appendChild(title);
      container.appendChild(h1);
      
      // console.log(stocks)//除錯用

      let table = document.createElement("table");
      table.style.margin = "0 auto";
      table.setAttribute("border", "1");
      table.style.borderCollapse = "collapse";
      table.style.textAlign = "center";
      table.style.width = "800px";

      container.appendChild(table);

      let tHead = stocks.fields;
      let row = table.insertRow();
      for (let i = 0; i < tHead.length; i++) {
        let td = row.insertCell();
        td.innerHTML = tHead[i];
      }

      let tContent = stocks.data;

      // console.log(tContent); //除錯用
      
      let tContentL = tContent.length - 1;
      for (let i = tContentL; i > 0; i--) {
        let tableRow = table.insertRow();
        for (let j = 0; j < tContent[i].length - 1; j++) {
          let rowTd = tableRow.insertCell();
          rowTd.innerHTML = tContent[i][j];
        }
      }

    });
  // https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20230113&stockNo=2330
}

