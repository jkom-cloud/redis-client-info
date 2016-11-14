#!/usr/bin/env node
const redis = require("redis");
const Table = require('cli-table');
const color = require("color-log");
const client = redis.createClient();

client.client('list', function (err, result) {
  const clientArr = result.split('\n');
  clientArr.pop(); // the last one is empty
  let arr = [];
  clientArr.map((item, index) => {
    let obj = {};
    const itemArr = item.split(' ');
    itemArr.forEach((kv, index) => {
      const kvArr = kv.split('=');
      obj[kvArr[0]] = kvArr[1];
    });
    arr.push(obj);
  });
  const table = new Table({
    head: ['ID', 'Addr', 'Name', 'Cmd']
  });
  arr.forEach((item, index) => {
    table.push([item.id, item.addr, color.help(item.name), color.info(item.cmd)]);
  });
  console.log(table.toString());
});
client.quit();