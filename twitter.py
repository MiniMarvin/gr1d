from twitter_scraper import get_tweets
import dialogflow
# import dialogflow_v2 as dialogflow

project_id = "elixirexperience"
session_id = "POKEBOLASESSION"

tweets = get_tweets('minimarvindroid', pages=1)
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

ct = 0
for t in tweets:
	text = t['text']
	if ct < 3:
		res = detect_intent_texts(project_id, session_id, [text], "pt")
		print(text)
		print(res)
		print()
	ct += 1