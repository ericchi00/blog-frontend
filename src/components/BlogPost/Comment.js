import React from 'react';
import { format } from 'date-fns';

const Comment = ({ comment }) => {
	return (
		<div className="row d-flex justify-content-center">
			<div className="col">
				<div className="card-body p-2">
					<div className="card mb-4">
						<div className="card-body">
							<p>{comment.text}</p>
							<div className="d-flex justify-content-between">
								<div className="d-flex flex-row align-items-center">
									<p className="small mb-0 ms-2">{comment.username.username}</p>
								</div>
								<div className="d-flex flex-row align-items-center">
									<p className="small text-muted mb-0">{format(new Date(comment.createdAt), 'Pp')}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Comment;
