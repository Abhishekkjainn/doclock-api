# API Documentation
======================

## Overview
--------

This API provides a set of endpoints for managing user documents. It allows users to upload, fetch, and delete documents, as well as create new users.

## Endpoints
------------

### Upload Document

* **URL:** `/api/upload/:userid/:docid/:docname/:doclink/:docpassword`
* **Method:** `GET`
* **Purpose:** Uploads a new document to the user's collection
* **Parameters:**
	+ `userid`: The ID of the user
	+ `docid`: The ID of the document
	+ `docname`: The name of the document
	+ `doclink`: The link to the document
	+ `docpassword`: The password for the document

### Fetch Document

* **URL:** `/api/fetch/:userid/:docid`
* **Method:** `GET`
* **Purpose:** Fetches a specific document from the user's collection
* **Parameters:**
	+ `userid`: The ID of the user
	+ `docid`: The ID of the document

### Fetch All Documents

* **URL:** `/api/fetchall/:userid`
* **Method:** `GET`
* **Purpose:** Fetches all documents from the user's collection
* **Parameters:**
	+ `userid`: The ID of the user

### Delete Document

* **URL:** `/api/delete/:userid/:docid`
* **Method:** `DELETE`
* **Purpose:** Deletes a specific document from the user's collection
* **Parameters:**
	+ `userid`: The ID of the user
	+ `docid`: The ID of the document

### Delete User

* **URL:** `/api/deleteuser/:userid`
* **Method:** `DELETE`
* **Purpose:** Deletes a user's entire collection
* **Parameters:**
	+ `userid`: The ID of the user

### Create User

* Coming Soon

## Installation
------------

To install the API, follow these steps:

1. Clone the repository: `git clone https://github.com/Abhishekkjainn/doclock-api.git`
2. Install the dependencies: `npm install`
3. Start the server: `node app.js`

## Usage
-----

To use the API, send a request to the desired endpoint with the required parameters.

For example, to upload a new document, send a GET request to `/api/upload/123/456/document-name/document-link/document-password`.

## Contributing
------------

To contribute to the API, follow these steps:

1. Fork the repository: `git fork https://github.com/Abhishekkjainn/doclock-api.git`
2. Create a new branch: `git branch feature/new-feature`
3. Make changes: `git add .` and `git commit -m "New feature"`
4. Push changes: `git push origin feature/new-feature`
5. Create a pull request: `git pull-request`

## License
-------

The API is licensed under the MIT License.

## Authors
--------

* Abhishek Jain - jainabhishek1904@gmail.com

## Portfolio
--------------

* https://abhishekjainn.vercel.app
