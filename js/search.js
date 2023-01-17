document.getElementById("searchStockBtn").onclick = function () {
  let stockNum = document.getElementById("searchStock").value;

  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let day = new Date().getDate();
  year = year.toString();
  month = "0" + (month + 1).toString();
  day = day.toString();
  date = year + month + day

  var stocks;
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

      let table = document.createElement("table");
      table.style.margin = "0 auto";
      table.setAttribute("border", "1");
      table.style.borderCollapse = "collapse";
      table.style.textAlign = "center";
      table.style.width = "800px"

      container.appendChild(table);

      let tHead = stocks.fields;
      let row = table.insertRow();
      for (let i = 0; i < tHead.length; i++) {
        let td = row.insertCell();
        td.innerHTML = tHead[i];
      }

      let tContent = stocks.data
      for (let i = 10; i > 0; i--) {
        let tableRow = table.insertRow();
        for (let j = 0; j < tContent[i].length; j++) {
          let rowTd = tableRow.insertCell();
          rowTd.innerHTML = tContent[i][j];
        }
      }

    });
  // https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20230113&stockNo=2330
}

// console.log(stocks)