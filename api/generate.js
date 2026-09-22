import axios from "axios";

export default async function handler(req, res){

    if(req.method !== "POST"){
        return res.status(405).json({
            message:"Method tidak diizinkan"
        });
    }

    const {email} = req.body;

    if(!email){
        return res.status(400).json({
            message:"Email kosong"
        });
    }

    try{

        const result = await axios.post(
            "https://axzyedev.biz.id/api/v1/send-magic-link",
            {
                email: email
            },
            {
                headers:{
                    "Content-Type":"application/json",
                    "X-API-Key":process.env.API_KEY
                }
            }
        );


        res.json({
            success:true,
            data:result.data
        });


    }catch(err){

        res.status(500).json({
            success:false,
            error:err.response?.data || err.message
        });

    }

}
