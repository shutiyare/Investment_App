// auth.js - auth route module.
// res.sendFile(img_file, { root: path.join(global.__profiledir, '') });
import path from "path";

export default function rscsRouter(Router, dbConn) {
    const rscs_router = Router();

    // GET profile images
    rscs_router.route('/images/:id').get(getImage)
    rscs_router.route('/docs/:id').get(getInvestmentFile)
    return rscs_router;
}

function getImage(req, res) {
    console.log(req.params)
    const img_file = req.params.id
    res.sendFile(img_file, { root: path.join(global.__profiledir, '') });
    
}

function getInvestmentFile(req, res) {
    console.log(req.params)
    const pdf_file = req.params.id
    res.sendFile(pdf_file, { root: path.join(global.__profiledir, '') });
    
}