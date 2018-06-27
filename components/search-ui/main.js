$(document).ready(function(){

	let container = $("main .container");
	$.getJSON("http://127.0.0.1:5000/api/resources", (allData) =>{
		console.log(allData)

		allData.forEach( data => {


		let resource = `
		<!-- resource preview card -->
		<section class="mainComponent" id="resourceCard">
		    <div class="resourcePreview">
		        <!-- resource image -->
		        <div class="resourcePreviewImage" style="background-image:url(${data.imageUrl})"></div>
		        <!-- resource info -->
		        <div class="resourcePreviewInfo">
		            <!-- title -->
		            <h4 class="previewTitle previewSection">${data.title.toString()}</h4>
		            <!-- meta infos -->
		            <div class="previewMeta previewSection">
		                <p href="#" class="previewLevel">${data.levelRating.toString()}</p>
		                <p> | </p>
		                <p href="#" class="previewTime">${data.timeCommitment.toString()}</p>
		            </div>
		            <!-- description -->
		            <div class="previewDesc previewSection">
		                ${data.desc.toString()}
		            </div>
		            <div class="previewTags previewSection">
		                <p>number of tags: <span class="previewTagCount">${data.tags.length}</span></p>
		            </div>
		            <!-- url -->
		            <div class="previewSection">&#8618; <a class="previewUrl" href="${data.url}">${data.url}</a></div>
		        </div>
		    </div>
		</section>
		`;

		container.append(resource);

		})

	
	}) // end get request


});