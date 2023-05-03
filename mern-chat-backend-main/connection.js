const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://yen:yen@merncluster.qgjlmp1.mongodb.net/test?retryWrites=true&w=majority`, () => {
  console.log('connected to mongodb')
})

//  test 為此 cluster 中的 database 