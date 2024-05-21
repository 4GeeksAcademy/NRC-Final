import React from 'react';
import { FaTwitter, FaYoutube, FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa';
import logo from "../../img/logo1.png"

export const Footer = () => {
	return (
		<footer style={{ backgroundColor: '#0A0E1A', color: 'white' }}>
			<div className="container-fluid py-4">
				<div className="row mb-3">
					<div className="col text-end">
						<img src={logo} alt="Logo" style={{ height: '50px' }} />
					</div>
				</div>
				<div className="row mb-3">
					<div className='col-6 align-items-center justify-content-center gap-2'>
						<div className="d-inline-flex gap-1">
							<a className="btn text-light ms-15" data-bs-toggle="collapse" href="#team" role="button" aria-expanded="false" aria-controls="team">About Website</a>
						</div>
						<div className="row">
							<div className="col">
								<div className="collapse multi-collapse" id="team">
									<div className="card card-body text-light" style={{ backgroundColor: '#0A0E1A'}}>
										<p>Rosa (Web designer and programmer)</p>
										<p>Noa (Web designer and programmer)</p>
										<p>Carlos (Data programming admin)</p>
									</div>
								</div>
							</div>
						</div>
						<p className="d-inline-flex gap-1">
							<a className="btn text-light" data-bs-toggle="collapse" href="#web" role="button" aria-expanded="false" aria-controls="web">Contact</a>
						</p>
						<div className="row">
							<div className="col">
								<div className="collapse multi-collapse" id="web">
									<div className="card card-body text-light" style={{ backgroundColor: '#0A0E1A'}}>
										<a>https://github.com/4GeeksAcademy/NRC-Final</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-6 d-flex align-items-center justify-content-center gap-2">
						<FaTwitter size={30} />
						<FaYoutube size={30} />
						<FaFacebook size={30} />
						<FaTiktok size={30} />
						<FaInstagram size={30} />

					</div>
				</div>
				<div className='row'>
					<div className="col text-center">
						<p>Copyright 2024 by NRC. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	);
};


{/* <footer className="footer mt-auto py-3 text-center fixed-bottom">
		<p>
		</p>
	</footer> */}

