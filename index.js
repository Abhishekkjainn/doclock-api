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
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DocLock API Documentation</title>
    <style>
      /* General Styles */
      body {
        font-family: 'Courier New', Courier, monospace;
        background-color: #0f0f0f;
        color: #33ff33;
        margin: 0;
        padding: 0;
      }
      h1, h2, h3 {
        color: #33ff33;
      }
      a {
        color: #33ff33;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
  
      /* Header Styles */
      header {
        background: #000000;
        padding: 20px;
        text-align: center;
        border-bottom: 2px solid #33ff33;
      }
      header h1 {
        margin: 0;
        font-size: 2.5rem;
      }
  
      /* Container Styles */
      .container {
        padding: 20px;
        max-width: 900px;
        margin: 0 auto;
      }
  
      /* Table Styles */
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
        background-color: #1a1a1a;
      }
      th, td {
        border: 1px solid #33ff33;
        padding: 10px;
        text-align: left;
      }
      th {
        background-color: #0f0f0f;
        color: #33ff33;
      }
      tr:nth-child(even) {
        background-color: #121212;
      }
  
      /* Code Block Styles */
      .code {
        background-color: #121212;
        border: 1px solid #33ff33;
        padding: 15px;
        border-radius: 5px;
        font-size: 0.9rem;
        overflow-x: auto;
        margin-bottom: 20px;
        color: #33ff33;
      }
  
      /* Footer Styles */
      footer {
        text-align: center;
        margin-top: 40px;
        padding: 20px;
        border-top: 1px solid #33ff33;
        font-size: 0.8rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>DocLock API Documentation</h1>
      <p>Manage documents in a secure, encrypted vault.</p>
    </header>
  
    <div class="container">
      <h2>Base URL</h2>
      <p><code>http://localhost:3000</code></p>
  
      <h2>Endpoints</h2>
  
      <h3>1. API Documentation</h3>
      <p><strong>Endpoint:</strong> <code>/</code></p>
      <p><strong>Method:</strong> GET</p>
      <p><strong>Description:</strong> Provides an HTML page with documentation for all available API routes.</p>
  
      <h3>2. Upload a Document</h3>
      <p><strong>Endpoint:</strong> <code>/api/upload/:userid/:docid/:docname/:doclink/:docpassword</code></p>
      <p><strong>Method:</strong> GET</p>
      <p><strong>Description:</strong> Uploads a new document to a specific user's collection.</p>
      <p><strong>Parameters:</strong></p>
      <ul>
        <li><code>:userid</code> - Unique identifier for the user.</li>
        <li><code>:docid</code> - Unique identifier for the document.</li>
        <li><code>:docname</code> - Name of the document.</li>
        <li><code>:doclink</code> - Link to the document (e.g., Google Drive URL).</li>
        <li><code>:docpassword</code> - Password to secure the document.</li>
      </ul>
      <p><strong>Response:</strong></p>
      <div class="code">
        {
          "status": 200,
          "message": "Data Uploaded to Secure Vault Successfully"
        }
      </div>
  
      <h3>3. Fetch a Document</h3>
      <p><strong>Endpoint:</strong> <code>/api/fetch/:userid/:docid</code></p>
      <p><strong>Method:</strong> GET</p>
      <p><strong>Description:</strong> Retrieves a specific document from a user's collection.</p>
      <p><strong>Response:</strong></p>
      <div class="code">
        {
          "uid": "userid",
          "docid": "docid",
          "docname": "docname",
          "doclink": "doclink",
          "docpassword": "docpassword"
        }
      </div>
  
      <h3>4. Fetch All Documents</h3>
      <p><strong>Endpoint:</strong> <code>/api/fetchall/:userid</code></p>
      <p><strong>Method:</strong> GET</p>
      <p><strong>Description:</strong> Fetches all documents stored in a specific user's collection.</p>
      <p><strong>Response:</strong></p>
      <div class="code">
        [
          {
            "uid": "userid",
            "docid": "docid1",
            "docname": "docname1",
            "doclink": "doclink1",
            "docpassword": "docpassword1"
          },
          {
            "uid": "userid",
            "docid": "docid2",
            "docname": "docname2",
            "doclink": "doclink2",
            "docpassword": "docpassword2"
          }
        ]
      </div>
  
      <h3>5. Delete a Specific Document</h3>
      <p><strong>Endpoint:</strong> <code>/api/delete/:userid/:docid</code></p>
      <p><strong>Method:</strong> DELETE</p>
      <p><strong>Description:</strong> Deletes a specific document from a user's collection.</p>
      <p><strong>Response:</strong></p>
      <div class="code">
        {
          "status": 200,
          "message": "Document deleted successfully."
        }
      </div>
  
      <h3>6. Delete All Documents for a User</h3>
      <p><strong>Endpoint:</strong> <code>/api/deleteuser/:userid</code></p>
      <p><strong>Method:</strong> DELETE</p>
      <p><strong>Description:</strong> Deletes all documents stored in a specific user's collection.</p>
      <p><strong>Response:</strong></p>
      <div class="code">
        {
          "status": 200,
          "message": "All user documents deleted successfully."
        }
      </div>
  
      <h3>7. Create a New User</h3>
      <p><strong>Endpoint:</strong> <code>/api/createuser</code></p>
      <p><strong>Method:</strong> POST</p>
      <p><strong>Description:</strong> Creates a new user in the database.</p>
      <p><strong>Request Body:</strong></p>
      <div class="code">
        {
          "userid": "unique_user_id",
          "name": "user_name",
          "email": "user_email"
        }
      </div>
      <p><strong>Response:</strong></p>
      <div class="code">
        {
          "status": 200,
          "message": "User created successfully."
        }
      </div>
    </div>
  
    <footer>
      &copy; 2024 DocLock API | Powered by Secure Vault Technology
    </footer>
  </body>
  </html>
  
  `);
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
