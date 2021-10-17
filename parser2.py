import json
from urllib.request import urlopen

# Opening JSON file
url = "https://data2.gldw.org/vdab/v2api/retrieveLatestEvents"
response = urlopen(url)

# returns JSON object as
# a dictionary
data = json.loads(response.read())

# Iterating through the json
# list
heatMapData_latitude = []
heatMapData_longitude = []
heatMapData_flow = []
heatMapData_stage = []
heatMapData_percentile = []
heatMapData_huc_cd = []

for i in data["Events"]:
	# filter for the Event objects that contain USGSData and USGSData_OH, and do not have non-numerical values for stage and flow.
	try:
		if("USGSData" in data["Events"][i]):
			# Storing Latitude
			latitude = float(data["Events"][i]["Latitude"])
			# Storing Longitude
			longitude = float(data["Events"][i]["Longitude"])
			# Storing Flow
			flow = float(data["Events"][i]["USGSData"]["flow"])
			# Storing Stage
			stage = float(data["Events"][i]["USGSData"]["stage"])
			# Storing Percentile
			percentile = float(data["Events"][i]["USGSData"]["percentile"])
			# Storing huc_cd
			huc_cd = float(data["Events"][i]["USGSData"]["huc_cd"])


			heatMapData_latitude.append(latitude)
			heatMapData_longitude.append(longitude)
			heatMapData_flow.append(flow)
			heatMapData_stage.append(stage)
			heatMapData_percentile.append(percentile)
			heatMapData_huc_cd.append(huc_cd)

			if(stage!=0):
				# print("{location: new google.maps.LatLng(42.0739, -80.2347), weight: 3.52},")
				print("{location: new google.maps.LatLng(",latitude,",",longitude,"), weight: ",stage,"},")
			# print("Latitude = ",latitude)
			# print("Longitude = ",longitude)
			# print("Stage = ",stage)
			# print("Flow = ",flow)
			# print("\n")


		if("USGSData_OH" in data["Events"][i]):
			# Storing Latitude
			latitude = float(data["Events"][i]["Latitude"])
			# Storing Longitude
			longitude = float(data["Events"][i]["Longitude"])
			# Storing Flow
			flow = float(data["Events"][i]["USGSData_OH"]["flow"])
			# Storing Stage
			stage = float(data["Events"][i]["USGSData_OH"]["stage"])
			# Storing Percentile
			percentile = float(data["Events"][i]["USGSData_OH"]["percentile"])
			# Storing huc_cd
			huc_cd = float(data["Events"][i]["USGSData_OH"]["huc_cd"])


			heatMapData_latitude.append(latitude)
			heatMapData_longitude.append(longitude)
			heatMapData_flow.append(flow)
			heatMapData_stage.append(stage)
			heatMapData_percentile.append(percentile)
			heatMapData_huc_cd.append(huc_cd)

	except:
		continue


# print(len(heatMapData_longitude))