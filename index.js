const axios = require('axios');
const fs = require('fs');
const path = require('path');

const writeStream = fs.createWriteStream(
  path.resolve(__dirname, 'stocks.json'),
  'utf-8'
);

axios({
  method: 'get',
  url: 'https://card.wb.ru/cards/detail?appType=1&curr=rub&dest=-2133462&regions=80,38,4,64,83,33,68,70,69,30,86,40,1,66,110,22,31,48,114&spp=0&nm=138593051;94340317;94340606;138590435;138607462;94339119;94339244',
}).then((response) => {
  const products = response.data.data.products;
  const stocks = [];

  products.map((product) => {
    const item = {
      Art: product.id,
    };

    product.sizes.map((sizes) => {
      sizes.stocks.map((size) => {
        if (size.wh === 117986) {
          item.Art = product.id;
          item[sizes.name] = size.qty;
        }
      });
    });

    stocks.push(item);
  });

  writeStream.write(JSON.stringify(stocks, null, 2));
});
