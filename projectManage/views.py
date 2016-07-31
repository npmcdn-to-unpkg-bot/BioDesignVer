# -*- coding:utf-8 -*-

"""

@author: Chenghao
"""

from django.shortcuts import render
from models import *
from accounts.models import *
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
import json
import string
import random

# Create your views here.

def noneIfEmptyString(value):
	if value == "":
		return None
	return value

def noneIfNoKey(dict, key):
	if key in dict:
		value = dict[key]
		if value == "":
			return None
		return value
	return None

class myError(Exception):
	def __init__(self, value):
		self.value = value
	def __str__(self):
		return repr(self.value)

def getUserProject(request):
	try:
		data = json.loads(request.body)
		print data
		token = Token()
		token = Token.objects.filter(token=data['token']).first()
		user = User()
		user = token.user
		projects = Project.objects.filter(creator=user)
		projectsList = []
		for project in projects:
			projectsList.append({
				'project_name': noneIfEmptyString(project.project_name),
				'project_id': project.id,
				'track': project.track.track,
				'function': noneIfEmptyString(project.function),
				'creator': project.creator.userName
				})
		result = {
			'successful': True,
			'data': projectsList,
			'error': {
				'id': '',
				'msg': '',
			}
		}
	except Exception, e:
		result = {
			'successful': False,
			'error': {
				'id': '',
				'msg': e.args,
			}
		}
	finally:
		return HttpResponse(json.dumps(result), content_type='application/json')


def addProject(request):
	try:
		data = json.loads(request.body)
		print data
		token = Token()
		token = Token.objects.filter(token=data['token']).first()
		user = User()
		user = token.user
		project_name = data['project_name']
		track = Tracks.objects.filter(track=data['track']).first()
		function = Functions.objects.filter(function=data['function']),first()
		project = Project()
		project.creator = user
		project.project_name = project_name
		project.track = track
		project.function = function
		project.save()
		result = {
			'successful': True,
			'error': {
				'id': '',
				'msg': '',
			},
		}
	except Exception,e:
		result = {
			'successful': False,
			'error': {
				'id': '1024',
				'msg': e.args
			}
		}
	finally:
		return HttpResponse(json.dumps(result), content_type='application/json')

def  deleteProject(request):
	try:
		data = json.loads(request.body)
		print data
		project_id = data['project_id']
		project = Project()
		project = Project.objects.filter(id=project_id).first()
		project.delete()
		result = {
			'successful': True,
			'error': {
				'id': '',
				'msg': '',
			},
		}
	except Exception,e:
		result = {
			'successful': False,
			'error': {
				'id': '1024',
				'msg': e.args
			}
		}
	finally:
		return HttpResponse(json.dumps(result), content_type='application/json')

def getProjectChains(request):
	try:
		data = json.loads(request.body)
		print data
		project_id = data['project_id']
		project = Project()
		project = Project.objects.filter(id=project_id).first()
		chains = Chain.objects.filter(project=project)
		chainsList = []
		for chain in chains:
			chainsList.append(
				{
					'chain_id': chain.id,
					'chain_sequence': chain.sequence,
					'chain_name': chain.name,
					'chain_isModified': chain.isModified,
					'chain_image_file_path': chain.image_file_path,
				})
		result = {
			'successful': True,
			'data': chainsList,
			'error': {
				'id': '',
				'msg': '',
			},
		}
	except Exception,e:
		result = {
			'successful': False,
			'error': {
				'id': '1024',
				'msg': e.args
			}
		}
	finally:
		return HttpResponse(json.dumps(result), content_type='application/json')

def addProjectChain(request):
	try:
		data = json.loads(request.body)
		print data
		project_id = data['project_id']
		project = Project.objects.filter(project_id=project_id).first()
		
		track = Tracks.objects.filter(track=data['track']).first()
		function = Functions.objects.filter(function=data['function']),first()
		project = Project()
		project.creator = user
		project.project_name = project_name
		project.track = track
		project.function = function
		project.save()
		result = {
			'successful': True,
			'error': {
				'id': '',
				'msg': '',
			},
		}
	except Exception,e:
		result = {
			'successful': False,
			'error': {
				'id': '1024',
				'msg': e.args
			}
		}
	finally:
		return HttpResponse(json.dumps(result), content_type='application/json')