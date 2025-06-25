import { useState, useEffect } from 'react';
import { Download, Receipt, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom'

export default function PurchaseInfo({
    $id,
    title,
    coverImageId,
    userId,
    uploaderName,
    // purchaseDate,
    pricing,
    price,
    // transactionId,
    pdfId
}) {

    const userData = useSelector((state) => state.auth.userData);
    const [transaction, setTransaction] = useState({})

    const downloadNote = ($id, pdfId) => {
        const fileUrl = appwriteService.downloadFile(pdfId);
        appwriteService.createDownloadInfo({ noteId: $id, userId: userData.$id })
        window.open(fileUrl, "_blank");
    }
    
    useEffect(()=>{
        (async()=>{let transactionInfo = await appwriteService.getTransactionInfo({noteId: $id, userId});
        console.log(transactionInfo);
        setTransaction(transactionInfo);
    })();
    }, [])
    


    return (


        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-5 w-full hover:shadow-md transition">
            

                {/* Cover Image */}
                <div className="w-48 aspect-[4/3] rounded-lg overflow-hidden border bg-gray-100">
                    <img
                        src={appwriteService.getFileView(coverImageId)}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Note Info */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                        <p>
                            Uploaded by: <span className="text-gray-800 font-medium">{uploaderName}</span>
                        </p>
                        <p>
                            Purchased on: <span className="text-gray-800 font-medium">{new Date(transaction.$createdAt).toLocaleString()}</span>
                        </p>
                        <p>
                            Price: <span className="text-gray-800">{pricing === 'Free' ? 'Free' : `₹${price}`}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <Receipt size={16} /> <span className="font-mono text-gray-700">Transaction Id: {transaction.$id}</span>
                        </p>
                    </div>
                    
                </div>
            

            
            <div className="flex flex-col gap-2">
                <Link to={`/note/${$id}`}
                    target="_blank"
                    className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                    <ExternalLink size={16} /> Open
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                <button
                    onClick={() => downloadNote($id, pdfId)}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                    <Download size={16} /> Download
                </button>
            </div>
        </div>
    );
}
