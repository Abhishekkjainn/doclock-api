const express = require('express');
const app = express();
const {
  initializeFirebaseApp,
  getFirebaseApp,
  getFirestore,
} = require('./config');
const { uploadData } = require('./config');
const { fetchData, fetchall } = require('./config');
const { deleteDocument, deleteUser } = require('./config');
const port = 3000;

app.get('/', async (req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>API Documentation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h1 {
        text-align: center;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }
      th {
        background-color: #f0f0f0;
      }
    </style>
  </head>
  <body>
    <h1>API Documentation</h1>
    <h2>Available Routes</h2>
    <table>
      <tr>
        <th>Route</th>
        <th>Method</th>
        <th>Purpose</th>
      </tr>
      <tr>
        <td>/</td>
        <td>GET</td>
        <td>Returns this API documentation</td>
      </tr>
      <tr>
        <td>/api/upload/:userid/:docid/:docname/:doclink/:docpassword</td>
        <td>GET</td>
        <td>Uploads a new document to the user's collection</td>
      </tr>
      <tr>
        <td>/api/fetch/:userid/:docid</td>
        <td>GET</td>
        <td>Fetches a specific document from the user's collection</td>
      </tr>
      <tr>
        <td>/api/fetchall/:userid</td>
        <td>GET</td>
        <td>Fetches all documents from the user's collection</td>
      </tr>
      <tr>
        <td>/api/delete/:userid/:docid</td>
        <td>DELETE</td>
        <td>Deletes a specific document from the user's collection</td>
      </tr>
      <tr>
        <td>/api/deleteuser/:userid</td>
        <td>DELETE</td>
        <td>Deletes a user's entire collection</td>
      </tr>
      <tr>
        <td>/api/createuser</td>
        <td>POST</td>
        <td>Creates a new user in the database</td>
      </tr>
    </table>
  </body>
  </html>`);
});

app.get(
  '/api/upload/:userid/:docid/:docname/:doclink/:docpassword',
  async (req, res) => {
    const data = {
      uid: req.params.userid,
      docid: req.params.docid,
      docname: req.params.docname,
      doclink: req.params.doclink,
      docpassword: req.params.docpassword,
    };
    const pdf = '/pdf.pdf';
    await uploadData(data);
    res.json({
      status: 200,
      message: 'Data Uploaded to Secure Vault Successfully',
    });
  }
);

app.get('/api/fetch/:userid/:docid', async (req, res) => {
  const data = await fetchData(req.params.userid, req.params.docid);
  res.json(data);
});

app.get('/api/fetch/:userid', async (req, res) => {
  const data = await fetchall(req.params.userid);
  res.json(data);
});

app.get('/api/delete/:userid/:docid', async (req, res) => {
  const data = await deleteDocument(req.params.userid, req.params.docid);
  res.json(data);
});

app.get('/api/deleteuser/:userid', async (req, res) => {
  const data = await deleteUser(req.params.userid);
  res.json(data);
});

app.listen(port, () => {
  initializeFirebaseApp();
  console.log(`Server is running on port ${port}`);
});
