const TelegramBot = require('node-telegram-bot-api');
const token = '764526331:AAGeXIlpwFn_IX_Kx0EQxZWtkf7K1HBCqcc';
const bot = new TelegramBot(token, {polling: true});
var qp = require('flexqp');
var con = require('../dbconfig.json');
qp.presetConnection(con);


bot.on(/^((?!\/ad|ann).)*$/, (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  bot.sendMessage(chatId, 'Hi');
});

module.exports.telenoti = async function(data) {

    var result = await qp.executeAndFetchPromise('select * from cms.telegram',[],con);
    for(let i = 0; i< result.length;i++)
    {
      bot.sendMessage(result[0].idno, data);
      console.log('Sent telemessage');

    }
}


async function getText() {
  var result = await qp.executeAndFetchPromise('select * from cms.denguead where dad_id = ?', [1]);
  return result;
}

async function getCount(table) {
  var result = await qp.executeAndFetchPromise('select count(*) from ' + table, []);
  return result;
}

async function getEverything(table, id) {
  var table_id = '';
  switch(table) {
    case('terroristad'):
      table_id = 'tad_id';
      break;
    case('hazead'):
      table_id = 'had_id';
      break;
    case('denguead'):
      table_id = 'dad_id';
      break;
    case('announcement'):
      table_id = 'ann_id';
      break;
  }
  var result = await qp.executeAndFetchPromise('select * from cms.' + table + ' where ' + table_id + ' = ?', [id]);
  // console.log(result);
  return result;
}

async function storeEverything(name, id) {
  var result = await qp.executeAndFetchPromise('insert into cms.telegram set name = ?, idno = ?', [name, id]);
  return result;
}

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  // console.log(msg);
  storeEverything(msg.chat.first_name, msg.chat.id);
});

bot.onText(/\/help/, (msg, match) => {

  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'WHAT HELP??');

});

global.realcount = 1;

bot.onText(/\/ann/, (msg, match) => {

  const chatId = msg.chat.id;
  const opts = {
    parse_mode: 'Markdown'
  };
  bot.sendMessage(chatId, '*📣 Announcement:*', opts);
  Promise.resolve(getCount('announcement')).then(function(value){
    var ann_count = value[0]['count(*)'];
    Promise.resolve(getEverything('announcement', realcount)).then(function(data){
      const opts = {
        reply_markup: {
          inline_keyboard: [[
           {
              text: '⬅️ Previous', 
              callback_data: 'announcement'
           }
          ]]
        },
        parse_mode: 'Markdown'
      };
      bot.sendMessage(msg.chat.id, '>>> *' + data[0].title + '*\n'
                                    + data[0].datetime + '\n'
                                    + '_' + data[0].content + '_', opts);
      realcount++;
      if (realcount == ann_count+1) {
        realcount = 1;
      };
    });
  });
});

bot.onText(/\/ad/, (msg, match) => {
  bot.sendMessage(msg.chat.id,'Which advisory would you like to view?', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: 'Terrorist ☠️',
          callback_data: 'terroristad'
        },{
          text: 'Haze 🌫️',
          callback_data: 'hazead'
        },{
          text: 'Dengue 🕷️',
          callback_data: 'denguead'
        }
      ]]
    }
  });
});


bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  // console.log(callbackQuery);

  if (callbackQuery.data == 'announcement') {
    Promise.resolve(getCount(callbackQuery.data)).then(function(value){
      var ann_count = value[0]['count(*)'];
      Promise.resolve(getEverything(callbackQuery.data, realcount)).then(function(data){
        const opts = {
          reply_markup: {
            inline_keyboard: [[
             {
                text: '⬅️ Previous', 
                callback_data: 'announcement'
             }
            ]]
          },
          parse_mode: 'Markdown'
        };
        bot.sendMessage(msg.chat.id, '>>> *' + data[0].title + '*\n'
                                      + data[0].datetime + '\n'
                                      + '_' + data[0].content + '_', opts);
        realcount++;
        if (realcount == ann_count+1) {
          realcount = 1;
        };
      });
    });
  } 
  
  else {
    bot.sendMessage(msg.chat.id, '‼️‼️‼️‼️‼️‼️ *Advisory* ‼️‼️‼️‼️‼️‼️', {
      parse_mode: 'Markdown'
    });
    Promise.resolve(getCount(callbackQuery.data)).then(function(value){ 
      // console.log(value[0]['count(*)']);
      var count = value[0]['count(*)'];
      
      for (var a = 1; a < count+1; a++) {
        Promise.resolve(getEverything(callbackQuery.data, a)).then(function(data){
          //bot.sendMessage(msg.chat.id, data[0].content);
          const opts = {
            parse_mode: 'Markdown'
          };
          bot.sendMessage(msg.chat.id, '>>> *' + data[0].cardtitle + '*\n'
                                      + data[0].title + '\n'
                                      + '_' + data[0].content + '_', opts);
        });
      }
    });
  };
});