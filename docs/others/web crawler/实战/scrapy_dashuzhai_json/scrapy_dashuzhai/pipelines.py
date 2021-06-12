# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json
from scrapy.exporters import JsonLinesItemExporter



class ScrapyDashuzhaiPipeline(object):
    def __init__(self):
        pass

    
    def open_spider(self, spider):
        self.fp = open("一梦到北大.json", "wb")
        self.exporter = JsonLinesItemExporter(self.fp, ensure_ascii=False, encoding="utf-8")


    def process_item(self, item, spider):
        self.exporter.export_item(item)
        # return item

    
    def close_spider(self, spider):
        self.fp.close()
