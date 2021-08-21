const { GraphQLServer } = require("graphql-yoga");

const path = require('path')
const fs = require('fs')


const typeDefs = `
  scalar Upload
    
  type File{
    url:String!
  }
  type Mutation {
    uploadFile(file: Upload!):File
  }

  type Query {
    hello: String
  }
`;
const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>{
    const pathName = path.join(__dirname,`/public/images/${filename}`)
    stream
      .pipe(fs.createWriteStream(pathName))
      .on("finish", () => resolve())
      .on("error", reject)
  });
const resolvers = {
  Mutation: {
    
    uploadFile: async (parent, { file }) => {
      
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      const url = `http://localhost:4000/public/images/${filename}`
      console.log(url)
      return {
        url:url
      }
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log(`Server is running on http://localhost:4000`))
