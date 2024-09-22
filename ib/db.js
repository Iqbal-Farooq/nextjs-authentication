import{MongoClient} from 'mongodb'
async function connectToDatabase() {
   const client =await MongoClient.connect('mongodb+srv://users_data:IQBALFAROOQ@cluster1.xmgmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
    return client
}

export default connectToDatabase