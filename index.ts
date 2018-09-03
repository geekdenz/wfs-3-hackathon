import * as ol from './node_modules/openlayers/dist/ol';
import * as convert from 'xml-js';
import * as xmlQuery from './node_modules/xml-query/dist';
import * as XmlReader from './node_modules/xml-reader/dist/reader';
import * as jQuery from 'jquery';
//import { styleFunction } from './styles'; // TODO: see below
var attribution = new ol.control.Attribution({
	collapsible: false
});
const nzLonLat = [173.8695203, -41.04294]
const map = new ol.Map({
	target: 'map',
	layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM({
				attributions: [
					new ol.Attribution({
						html: 'Web Client © ' +
						'<a href="https://www.landcareresearch.co.nz/">Manaaki Whenua - Landcare Research</a>'
					}),
					new ol.Attribution({
						html: '' + ol.source.OSM.ATTRIBUTION
					})
				]
			})
		})
	],
	controls: ol.control.defaults({attribution: false}).extend([attribution]),
	view: new ol.View({
		center: ol.proj.fromLonLat(nzLonLat),
		zoom: 8
	})
});

const $ = jQuery;

const collections: any[] = [];
const applyTransform = ol.extent.applyTransform
const getTransform = ol.proj.getTransform

function handleWfsName(event): boolean {
	const that: JQuery = this
	const id = $(that).attr('id')
	const collection = collections.filter(c => c.name === id)[0];
	console.log('ID:', id, collection)
	const currentExtent = map.getView().calculateExtent();
	console.log('currentExtent', currentExtent);
	
	const bbox = currentExtent.join(',') + `,EPSG:3857`;
	console.log(bbox);
	const link = collection.links[0].href + "&count=20&bbox=" + bbox + "&"
	console.log(link);
	fetch(link, { headers: { accept: "application/geo+json" } })
		.then(r => r.json())
		.then(geoJson => {
			console.log(geoJson);
			const features = new ol.format.GeoJSON().readFeatures(geoJson, {
				dataProjection: "EPSG:4326",
				featureProjection: "EPSG:3857"
			});
			const source = new ol.source.Vector({ features: features });
			const layer = new ol.layer.Vector({ source: source }); //,
			//style: styleFunction // TODO: fails because of types
			console.log("layers:", map.get("layers"))
			map.addLayer(layer);
		});
	return true;
}

const wfs3url = 'https://npm.landcareresearch.co.nz/wfs/collections?wfs2=https%3A%2F%2Flris.scinfo.org.nz%2Fservices%3Bkey%3D619588ed391245328d9c58fb16558c44%2Fwfs&count=10'
fetch(wfs3url)
.then(resp => resp.json())
.then(json => {
	// return console.log(json)
	const titles = collections.map(c => c.title)
	const links = collections.map(c => c.links[0])
	// console.log("links:", links)
	json.collections.map(c => {
		const title = c.title
		const name = c.name
		const link = c.links[0]
		$('#name-list').append($(`<li><a href="#" id="${name}" class="wfs-name">${title}</a> Download: <a target="_blank" href="${link}">Data</a></li>`))
		collections.push(c);
	})
	$('.wfs-name').click(handleWfsName)
	$('.loading').hide()
	/*
	const ast = XmlReader.parseSync(text);
	const xq = xmlQuery(ast).find('Collection');
	xq.map(node => {
		const nameNode = node.children.filter(n => n.name === 'Name')[0];
		const titleNode = node.children.filter(n => n.name === 'Title')[0];
		if (nameNode && nameNode.children && nameNode.children.length) {
			const name = nameNode.children[0].value;
			const title = titleNode.children[0].value;
			const link = node.children[0].attributes.href + '?count=100';
			$('#name-list').append($(`<li><a href="#" id="${name}" class="wfs-name">${title}</a> Download: <a target="_blank" href="${link}">Data</a></li>`))
			collections.push(node);
		}
	});
	$('.wfs-name').click(handleWfsName);
	*/
});

