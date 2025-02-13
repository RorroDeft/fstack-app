import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "fstack-app-27a20",
      clientEmail: "firebase-adminsdk-fbsvc@fstack-app-27a20.iam.gserviceaccount.com",
      // Asegúrate de formatear correctamente la clave privada
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkfqSAOvKeFBfV\ni09K2T3Q9EKHBKUYuDeBup7EaCluGMobrHp5cvuSqaJp4rE2wbf8vCKBXpCTEeu7\n18ncW7UQKFefcM/4mWvqmboeDwXZASwviWuK45HfDVyqEKKfD4n3BhOnunr+smrb\nN477+0qyjslSvr0VkQkd54K2zTSoxAV4q+Pv7fYnlSjBAuuiDuZdWkcGFnqdzTpK\n1JlZH5zpL+R6sRxq7lhS86FXvYYf5ujbWLYVjC0rBbqrNNOSCT919orOKDeIv3v0\n650rVHmIRFYrVIezj9GnT+/kCSrHss3F/vsXtLhCua1dGYyPl07d28gRXekh2l2j\ne5VCPNoVAgMBAAECggEAHdeR3WeUU2RezJFo8bHGuq1NknQfxYPKIiFqo0QoW/5o\nUCvyziyzgjB/NAl5z+7GA7ZX5jNzNBM4uovT5cPHbeZ7uwO63yVqRBXeg4yDKZLC\nYt9h4MEXWilw6bN55TRq+aMjFrdIkANrSljiekllDE7GLFpJMGvvBPtWpfZFeuZG\nd+k1yKmmTrUkZCFnAmf0e9chEWFfBM+MyTs/Uo9zQeLMaGMlabteiZb7yGSikKDB\nHjlJyL8L1jQ5dxe/q3xE1QL1JGZWsPUOPkvvw9pW984feYAYwyfN70UZ3TUYTzBh\nAPqSR6tncd413X+w1rTz54itx3ieLhZ5V4NuP/JIMQKBgQDV/pyG1zAanFZvO3NI\niUTkhvPFl/nr64QGZ0AcPGYrhWhiC00PuJK3rEXdPCPx8xkLphTZca6frakVI2D4\noa6bLKRZDKFSgA0k0CjbPGp6V88xvqz1LuIebijEQd61IUdk77wsxd+19hT5gRkJ\n2HSVkQRECo8n2zbNmcoo0M8C/QKBgQDEyJ//faEf0t74tgs/PMToFE/mPaqwj801\n+3U2gOIvRQ1y150GyfYUJcICLOF8CE0cTpEVtXifG6DuMWJjh8P/84ApOMT1IhwA\nnz1K5ntvl4cErGW5GPRX5TYWxgGPV4jUC75sj5zwL3m4cOyTalN9kmBaZFqZeGfp\nLdE1mA5a+QKBgQCbAFeEW+3d+Iuq+hbg3XznQtDjuNcwCWGR+cu4KA+hSnp3OdRR\npNGw9LmOK/elUv47L8s+TVe9FV65juy4avQ8NbO9RKa9ST88AQL2+eXuRBgx4fkJ\nhzIF9KjWrxePf1FlTTix/YmzFVHP/7CRLxYTF/1NA5D5v5EMj26c7dJkSQKBgGPr\nLvqu0qpzC06kOO/CLoVdEvjopQwD6IIZjXnAVZkE6gA/JPd2gyHVzj4GhfPRzz2p\nUxf/ziCUCdIId1nsbQRAovnLXo7N5AQY1yl6AIE4IpGn6/rhheg/dYh4wAAFxW9O\nC0HaZii7IoYZqLZtjbk8Ivqi7DHzJmgLIKii7d8ZAoGBAMU/Nc79O2WNzSfzNMrl\ntS1NfKDfK1l56BdUpGRFzMps+Il+4SClP5teWftRYTZ6ks+YQTbt88476xm+SAsu\nZ6qWmrfpf3MXx/zKdmtqfKY3WlSIB04kR2viB0cok9FUIMcKd0tYniagCoR5xxYI\n2d10qfIxdRdGWiNCqQoqXatC\n-----END PRIVATE KEY-----\n"?.replace(
          /\\n/g,
          "\n"
        ),
    }),
    // Opcional: databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.firestore();
export default db;
