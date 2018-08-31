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

let collections: any[] = [];

function handleWfsName(event): boolean {
	const that: JQuery = this
	const id = $(that).attr('id')
	console.log(id)
	const collection = collections.filter(c => {
		const child = c.children.filter(c => {
			const nameChild = c;
			return c.name == 'Name';
		})[0];
		const value = child.children[0].value;
		return value === $(that).attr('id');
	})[0];
	const currentExtent = map.getView().calculateExtent();
	console.log('currentExtent', currentExtent);
	const bbox = currentExtent.join(',') + `,EPSG:3857`;
	console.log(bbox);
	const link = collection.children[0].attributes.href + `?bbox=` + (bbox) + `&count=30`;
	console.log(link);
	fetch(link, {
		headers: {
			'accept': 'application/geo+json'
		}
	})
		.then(r => r.json())
		.then(geoJson => {
			console.log(geoJson);
			const features = (new ol.format.GeoJSON()).readFeatures(geoJson, {
				dataProjection: 'EPSG:4326',
				featureProjection: 'EPSG:3857'
			});
			const source = new ol.source.Vector({
				features: features
			});
			const layer = new ol.layer.Vector({
				source: source//,
				//style: styleFunction // TODO: fails because of types
			});
			map.addLayer(layer);
		});
	return true;
}

const wfs3url = 'https://npm.landcareresearch.co.nz/wfs/collections?wfs2=https%3A%2F%2Flris.scinfo.org.nz%2Fservices%3Bkey%3D619588ed391245328d9c58fb16558c44%2Fwfs&count=10'
fetch(wfs3url)
.then(resp => resp.json())
.then(json => {
	// return console.log(json)
	const collections = json.collections
	const titles = collections.map(c => c.title)
	const links = collections.map(c => c.links[0])
	// console.log("links:", links)
	collections.map(c => {
		const title = c.title
		const name = c.name
		const link = c.links[0]
		$('#name-list').append($(`<li><a href="#" id="${name}" class="wfs-name">${title}</a> Download: <a target="_blank" href="${link}">Data</a></li>`))
	})
	$('.wfs-name').click(handleWfsName)
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

