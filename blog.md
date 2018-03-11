Hackathon
=========

This is the main event held on the 6th and 7th of March in Fort Collins, CO. On the 5th I took preparations and did some MWLR work.

The topic of the Hackathon was WFS 3. This was the first time, that the OGC did such an event, where developers all around the world were invited to contribute to an upcoming standard in a less formal and more innovative way.

I was there to implement a basic WFS 3 client, to learn about the standard, its process and people. I have done this and shared the code on GitHub:

https://github.com/geekdenz/wfs-3-hackathon

It should run with the instructions. Luckily, Panagiotis (Peter) A. Vretanos provided an almost complete implementation of the standard public through his company's services:

https://pvretano.com/cubewerx/cubeserv/default/wfs/3.0.0/framework

I tried to focus on the important bits:

 * Set Up a Project
 * Implement basic features
 * Talk to people at the event to learn about and contribute to the standard
 * Make sure to get in touch with relevant people in the field

The WFS above, at the time, was only implemented in XML. WFS 3 is a much more free form standard than version 2 or any before has been.

There are some real basics that must be supported, but mostly there is freedom for vendors to implement their own features. Vendor features are implemented as extensions and I believe I have enough knowledge now in this field to implement the S-map and Our Environment area and point queries as WFS 3 services.

It is a more free form standard and I would recommend we implement our own WFS, because the core is very basic and should not take too long to do.

XML
==========

I was also very skeptical about the over-use of XML in the standard. However, this has been overcome with support for JSON. Even so, it being JSON, one potentially looses a schema driven, verifiable format. This is why I used an XML parser called XML Query, a JavaScript library I found, to parse the XML and query it. xml-query is not perfectly implementing CSS selectors on XML like the name suggests, but gives enough features to parse XML. I used it to parse the WFS 3 XML response, and after getting used to it, it was actually not too bad to deal with the XML.

For an exercise I got the Collection XML elements and got their collection IDs to query the WFS for the current map extent as GeoJSON.

GeoJSON
=======

I came across this fine format quite a bit in the course of these days. The main issue with it is that it does not support projections in the standard. I've noticed this first, when talking to David Medyckyj-Scott about my skepticism about the standards. However, missing projections in GeoJSON are not a problem with the format of JSON or anything other than ease of use. I don't think it should be a limitation though. Luckily, in WFS 3 one can implement any geo format, so we can easily adapt GeoJSON to include projections or just use WKT or even WKB.

The projection problem has 2 really big problems:

Coordinates won't be as precise, because significant precision can be lost when re-projecting.

Computing requirements may double, because the data may be in another projection and the server needs to convert it on the way out. The client in turn will probably re-project the data and have to do the same operations in reverse or even worse to another projection.

XMLB
====

This is a format that is new to me. Apparently, one can use XMLB (binary) to compress the XML data and still relatively easily traverse a tree of data.

We may want to look into implementing XMLB in our WFS as an alternative format after XML and JSON. I think implementing both XML and JSON is important to show compliance though.

WKT / WKB
=========

WKT is a good format for communicating coordinates. It is compact, well understood and implemented in most libraries. A few years back, we had a student try out WKB. The transport happened over PNG images and was decoded on the client with JavaScript.

Technology has advanced and with clients (browsers) now supporting WebSockets and soon WebAssembly more can be put onto the client.

STAC
====

Thursday the 8th will be our main STAC day. STAC is is the event day about SpatioTemporal data which is interesting in context of the New Zealand Possum Model at https://npm.landcareresearch.co.nz/possums/anim/ .

Travel
======

During travels I've been reading up on the event and documentation such as the standard spec draft.

We have been welcomed by Scott Simmons, one of the organisers. He took care of everyone very well and made us feel at home.

Coming in to LA is always a bit stressful but travels have been comparatively easy going.

The hotel was great although I was slightly disappointed with some of the meals tbh. Breakfast was fine.
