# URL to hit
url="http://13.48.1.69:80"

# Make the HTTP request using curl
response=$(curl -s -o /dev/null -w "%{http_code}" $url)

# Print the response code
echo "Response Status Code: $response"
