import React from 'react';

const Comment = ({ comment }) => {
	return (
		<div className="row d-flex justify-content-center">
			<div className="col">
				<div className="card-body p-2">
					<div className="card mb-4">
						<div className="card-body">
							<p>comment itself</p>
							<div className="d-flex justify-content-between">
								<div className="d-flex flex-row align-items-center">
									<p className="small mb-0 ms-2">name</p>
								</div>
								<div className="d-flex flex-row align-items-center">
									<p className="small text-muted mb-0">date format </p>
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
