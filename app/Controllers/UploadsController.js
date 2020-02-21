const Jimp = require('jimp');
const videoshow = require('videoshow');
const path = require('path');
const publicPath = path.join(__dirname, '../../public');
const random = Math.floor(Math.random()* 100);

module.exports = {

    image: (req, res) => {
    	Jimp.read(req.body.image).then(image => {
    		Jimp.loadFont(Jimp.FONT_SANS_8_BLACK).then(font => {
    			image
                .resize(256, 256) // resize
                .quality(60)
                .print(font, 10, 10, "Hello World!", 10)
    			.write(publicPath + '/images/' + random + "-image.jpg");
    		});

    		res.send('Image Saved Successfully!!');
    	})
    	.catch(err => {
    		console.log(err);
    	});
    },

    video: (req, res) => {
    	const options = {
    		fps: 25,
    		transition: true,
    		transitionDuration: 1,
    		videoBitrate: 1024,
    		videoCodec: "libx264",
    		size: "640x?",
    		format: "mp4",
    		subtitleStyles: {
    			Fontname: "Verdana",
    			Fontsize: "26",
    			PrimaryColour: "11861244",
    			SecondaryColour: "11861244",
    			TertiaryColour: "11861244",
    			BackColour: "-2147483640",
    			Bold: "2",
    			Italic: "0",
    			BorderStyle: "2",
    			Outline: "2",
    			Shadow: "3",
    			Alignment: "1",
    			MarginL: "40",
    			MarginR: "60",
    			MarginV: "40"
    		}
    	}

    	const images = req.body.images;
    	var path = publicPath + '/videos/';

    	videoshow(images, options).save(path + random + "-video.mp4")
    	.on('start', function (command) {
    		console.log('ffmpeg process started:', command)
    	})
    	.on('error', function (err, stdout, stderr) {
    		console.error('Error:', err)
    		console.error('ffmpeg stderr:', stderr)
    	})
    	.on('end', function (output) {
    		console.log('Video created in:', output)
    		res.send("Video created successfully in " + output);
    	});
    }
}