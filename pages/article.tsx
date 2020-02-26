import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import Query from '../components/Query';
import ARTICLE_QUERY from '../queries/article/article';

const Article = () => {
	const router = useRouter();
	return (
		<Query query={ARTICLE_QUERY} id={router.query.id}>
			{({ data: { article } }) => {
				return (
					<div>
						<div
							id="banner"
							className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
							data-src={process.env.API_URL + article.image.url}
							data-srcset={process.env.API_URL + article.image.url}
							data-uk-img
						>
							<h1>{article.title}</h1>
						</div>

						<div className="uk-section">
							<div className="uk-container uk-container-small">
								<ReactMarkdown source={article.content} />
								<p>{article.published_at}</p>
							</div>
						</div>
					</div>
				);
			}}
		</Query>
	);
};

export default Article;
