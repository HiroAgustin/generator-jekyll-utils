---
layout: <%= layout %>
title: <%= name %>
date: <%= date %> <%= time %><% if (categories) { %>
categories: <% categories.forEach(function (category) { %>
- <%= category %><% }) %><% } %><% if (tags) { %>
tags: <% tags.forEach(function (tag) { %>
- <%= tag %><% }) %><% } %>
---
