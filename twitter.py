from twitter_scraper import get_tweets
import dialogflow
# import dialogflow_v2 as dialogflow
import time

project_id = "elixirexperience"
project_id2 = "gr1d-viclxt"
session_id = "POKEBOLASESSION"
session_id2 = "POKEBOLASESSION"

# project_id, session, id usuario
def detect_intent_texts(project_id, session_id, texts, language_code):
    """Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversation."""
    session_client = dialogflow.SessionsClient()

    session = session_client.session_path(project_id, session_id)
    print('Session path: {}\n'.format(session))

    for text in texts:
        text_input = dialogflow.types.TextInput(
            text=text, language_code=language_code)

        query_input = dialogflow.types.QueryInput(text=text_input)

        response = session_client.detect_intent(
            session=session, query_input=query_input)

        print('=' * 20)
        print('Query text: {}'.format(response.query_result.query_text))
        print('Detected intent: {} (confidence: {})\n'.format(
            response.query_result.intent.display_name,
            response.query_result.intent_detection_confidence))
        print('Fulfillment text: {}\n'.format(
            response.query_result.fulfillment_text))


oldTweets = []

while True:
	tweets = get_tweets('minimarvindroid', pages=1)
	ct = 0
	for t in tweets:
		text = t['text']
		if ct >= 3:
			break
		
		res = detect_intent_texts(project_id, session_id, [text], "pt")
		if response.query_result.intent.display_name == "wantToTravel":
			# make fake POST on it
			detect_intent_texts("minimarvin/ABCDEFG")

		ct += 1
	# Wait for 5 seconds
	time.sleep(5) 
	oldTweets = tweets