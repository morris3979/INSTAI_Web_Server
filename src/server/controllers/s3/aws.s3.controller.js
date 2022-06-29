const stream = require('stream');
const s3 = require('./aws.s3.config');

exports.doDownload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.downloadParams;

	params.Key = req.params.filename;

	s3Client.getObject(params)
		.createReadStream()
		.on('error', function(err){
			res.status(500).json({error:"Error -> " + err});
		}).pipe(res);
}