const http = require("http");
const express = require('express');
var cors = require('cors');
const glossary = require("./glossary");

const port = 3002;

const app = express();

app.options('*', cors()) // include before other routes 
app.use(cors())

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "text/plain");
  response.end("Hello World");
});

app.get('/', function (req, res) {
  res.send('GET request to homepage')
})

app.post('/users/login', function (req, res) {
  res.send({
    access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4xQHBoaXRvcG9saXMuY29tIiwicm9sZSI6ImFkbWluIiwiaXNzIjoiRGF0YSBTdG9yZSIsImV4cCI6MTY0NTY4MTMzMiwiaWF0IjoxNjQ1Njc3NzMyfQ.TQAHQ2GR0HIQ8BFXULw6ojRHhDCTyrUAmM2Lxd3aqRYd_vQ-uw69LjjnwqIvW-Gxt5OTvPsGSLayprkRHL3xuVYozhkBZ2uKGNltpxm6P16kGh19XDaA_BDIG18qrIOLy0C_4pYqhFZhiDpB--gva7_kBZHkuLrcJeYgLhPQ7eg",
    email: "admin1@phitopolis.com"
  })
})

app.post('/users/verify-access', function (req, res) {
  res.send(true)
})

app.get('/datasets', function (req, res) {
  res.send({
    "result": [
          {
            "id":231,
            "name":"Yolostocks Meme Stocks Tracker Wsb",
            "access":"pending",
            "tags":[
                
            ]
          },
          {
            "id":230,
            "name":"Wolfe Game",
            "access":"pending",
            "tags":[
                
            ]
          },
          {
            "id":229,
            "name":"Us Treasury Daily Treasury Statement",
            "access":"pending",
            "tags":[
                
            ]
          },
    ],
    "_metadata":{
        "page":1,
        "page_size":20,
        "total_count":122
    }
  })
})

app.get('/datasets/:id', function (req, res) {
  res.send({
    "result":{
        "id": req.params.id,
        "name":"Yolostocks Meme Stocks Tracker Wsb",
        "location":"/fs/yolostocks_meme_stocks_tracker_wsb",
        "summary":"Sample test this",
        "assets_class_coverage":"Asset",
        "delivery_frequency_lag":"10",
        "historical_coverage":"history",
        "geographical_coverage":"Canada",
        "notes":"sample notes",
        "charts":[
    {
        "server_filename":"20220215223728923193_Header-Image.png",
        "file_name":"Header-Image.png",
        "id":58,
        "protected":false,
        "image":"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"
    }
        ],
        "documents":[

        ],
        "access":"pending",
        "tags":[

        ]
    }
  })
})

app.get('/datasets/:id/glossary', function (req, res) {
  const mockGlossary = glossary.map(val => ({
    ...val,
    file: `${req.query.file_set_type}${val.file}`,
    file_set_type: req.query.file_set_type || 'raw_data',
  }))


  if (req.query.search) {
    return res.send({
      result: [
        {
          "file": "Sample_File_Name_1",
          "file_set_type": req.query.file_set_type || 'raw_data',
          "fields": [
              {
                  "field": `${req.query.search}`,
                  "data_type": "float",
                  "description": "Quis autem vel eum iure Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat"
              },
          ],
        },
        {
          "file": "Sample_File_Name_2",
          "file_set_type": req.query.file_set_type || 'raw_data',
          "fields": [
              {
                  "field": `${req.query.search}`,
                  "data_type": "float",
                  "description": "Quis autem vel eum iure Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat"
              },
          ],
        }

      ],
      _metadata: {
        page: Number(req.query.page),
        total_count: 8,
        current_page: Number(req.query.page),
        page_size: Number(req.query.page_size)
      }
    })
  }

  res.send({
    result: mockGlossary,
    _metadata: {
      page: Number(req.query.page),
      total_count: 8,
      current_page: Number(req.query.page),
      page_size: Number(req.query.page_size)
    }
  })
})

app.get('/datasets/:id/glossary/files', function (req, res) {
  const mockGlossary = glossary.map(val => ({
    file: `${req.query.file_set_type}${val.file}`,
    file_set_type: req.query.file_set_type || 'raw_data',
  }))


  if (req.query.search) {
    return res.send({
      result: [
        {
          "file": "Sample_File_Name_1",
          "file_set_type": req.query.file_set_type || 'raw_data'
        },
        {
          "file": "Sample_File_Name_2",
          "file_set_type": req.query.file_set_type || 'raw_data'
        }

      ]
    })
  }

  res.send({
    result: mockGlossary
  })
})

app.get('/datasets/:id/glossary/fields', function (req, res) {
  const mockGlossary = glossary.map(val => ({
    field: val.field,
    data_type: val.data_type,
    description: val.description
  }))

  res.send({
    result: mockGlossary,
    _metadata: {
      page: Number(req.query.page),
      total_count: 8,
      current_page: Number(req.query.page),
      page_size: Number(req.query.page_size)
    }
  })
})

app.get('/datasets/:id/versions', function (req, res) {
  res.send(
    {
      "result": [
          "1.0",
          "2.0",
          "2.1",
          "3.0a",
          "3.0b"
      ]
    }
  )
})

app.get('/lookup/file-set-types', function (req, res) {
  res.send(
    {
      "result": [
        {
          "name": "Raw Data",
          "value": "raw_data"
        },
        {
          "name": "ID Map",
          "value": "id_map"
        },
        {
          "name": "Formatted Data",
          "value": "formatted_data"
        }
      ]
    }
  )
})

app.listen(process.env.PORT || port);
