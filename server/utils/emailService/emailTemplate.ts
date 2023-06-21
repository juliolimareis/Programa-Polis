export const emailRecoveryTemplate = `
<!DOCTYPE html>

<html lang="pt"
	style="
		width: 100%;
		height: 100%;
		margin: 0;
	">

<head>
	<title>Recuperação de conta Email</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="
	width: 100%;
	height: 100%;
	margin: 0;
	background-color:#f1f1f1;
">

	<div align="center"
		style="
			margin:0;
			padding:0;
			height:100%;
		">

		<div style="
			position: fixed;
			left: 0;
			right: 0;
			margin: 0;
			z-index: -1;
			display: block;
			width:100%;
			-webkit-filter: blur(5px);
			-moz-filter: blur(5px);
			-o-filter: blur(5px);
			-ms-filter: blur(5px);
			filter: blur(3px);
			border-radius: 20px;"
		></div>

		<table style="border-radius: 10px;">
			<tbody style="margin:0;">
				<tr style="border-bottom-left-radius:10px;border-bottom-right-radius:10px">
					<td style="padding:10px 0px 8px 0px;font-family:'proxima-nova',sans-serif" align="center">
					</td>
				</tr>

				<tr>
					<td align="center">
						<table style="overflow-x:hidden;margin:0px 10px 0px 10px;border-top:6px solid {system_code_color};" cellspacing="0"
							cellpadding="0" border="0" align="center">

							<tbody>
								<tr>
									<td style="padding-top:13px;font-family:'proxima-nova',sans-serif" bgcolor="#ffffff"
										align="left">
										<h1 align="center" style="margin:0px;padding:0;font-size:26px;color:#333f4c;">
											{system_name}
										</h1>
										<div align="center" style="margin:0px;padding:0;padding-top:5px;font-size:20px;color:#333f4c;">
											Solicita&ccedil;&atilde;o de recupera&ccedil;&atilde;o de senha
										</div>
									</td>
								</tr>

								<tr>
									<td style="padding:20px 30px 0px 30px;margin:0px" bgcolor="#ffffff" align="center">
										<table style="width:100%">
											<tbody>
												<tr>
													<td
														style="border-top:solid 1px #eaeaef;border-left:none;border-right:none;border-bottom:none;border-collapse:collapse;border-spacing:0;width:100%;margin:0px 0px 0px 0px"
														align="center"></td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td style="padding:20px 30px 0px 30px;font-family:'proxima-nova',sans-serif" bgcolor="#ffffff"
										align="left">
										<p style="padding:0px;color:#333f4c;margin:0;font-size:18px;line-height:28px">
											Ol&aacute; <strong>{userName}</strong>, voc&ecirc; solicitou a
											<strong>recupera&ccedil;&atilde;o</strong>
											de senha pelo sistema
											<a
												href="{system_url}" alt="Central de Ajuda | {system_name}"
												style="color:{system_code_color}"
												target="_blank"
											>
												<strong>{system_name}.</strong>
											</a>
											<br><br>
											Siga os passos abaixo para continuar:
										</p>
									</td>
								</tr>

								<tr>
									<td style="padding:20px 20px 0px 20px;font-family:'proxima-nova',sans-serif" bgcolor="#ffffff" align="left">
										<table style="overflow-x:hidden;margin:0px 10px 0px 10px;" cellspacing="0" cellpadding="10" border="0"
											align="center">
											<tbody>
												<tr>
													<td style="color:{system_code_color};margin:0;font-size:22px;font-weight:600;line-height:28px">
														1
													</td>
													<td>
														<p style="padding:0px;color:#525f66;margin:0;font-size:18px;line-height:28px">
															Clique
															<a href="{url}" alt="Central de Ajuda | {system_name}" style="color:{system_code_color}" target="_blank">
																aqui
															</a>
															para para acessar o formulário de recupera&ccedil;&atilde;o.
														</p>
													</td>
												</tr>
												<tr>
													<td style="color:{system_code_color};margin:0;font-size:22px;font-weight:600;line-height:28px">

														2
													</td>
													<td>
														<p style="padding:0px;color:#525f66;margin:0;font-size:18px;line-height:28px">
															Insira a nova <strong>senha</strong> idêntica nos dois campos.
														</p>
													</td>
												</tr>
												<tr>
													<td style="color:{system_code_color};margin:0;font-size:22px;font-weight:600;line-height:28px">
														3
													</td>
													<td>
														<p style="padding:0px;color:#525f66;margin:0;font-size:18px;line-height:28px">
															Confirme no botão salvar.
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td style="padding:20px 30px 0px 30px;font-family:'proxima-nova',sans-serif" bgcolor="#ffffff"
										align="left">
										<hr style="border:1px solid #fafafa">
									</td>
								</tr>

								<tr>
									<td style="padding:20px 30px 0px 30px;font-family:'proxima-nova',sans-serif" bgcolor="#ffffff"
										align="left">
										<p style="padding:0px;color:#333f4c;margin:0;font-size:18px;line-height:28px">
											<span style="color: {system_code_color};">!*</span> No caso de n&atilde;o desejar mudar as credenciais favor desconsiderar.
										</p>
									</td>
								</tr>

								<tr>
									<td style="border-bottom-left-radius:10px;border-bottom-right-radius:10px;padding:40px 20px 0px 20px;font-family:'proxima-nova',sans-serif;border-bottom:6px solid {system_code_color}" bgcolor="#ffffff" align="left">
									</td>
								</tr>

								<!-- <tr bgcolor="#f1f1f1">
									<td style="padding:40px 10px 0px 10px;font-family:'proxima-nova',sans-serif" align="left">
										<p style="padding:0px;color:#7e8790;margin:0;font-size:16px;text-align:center">
											<b>Central de Suporte Fala Ibira&ccedil;u</b>
										</p>
									</td>
								</tr> -->

								<!-- <tr bgcolor="#f1f1f1">
									<td style="padding:15px 10px 0px 10px;font-family:'proxima-nova',sans-serif" align="left">
										<p style="padding:0px;color:#7e8790;margin:0;font-size:16px;text-align:center">
											Dúvidas? Acesse
											<a href="https://www.camaraibiracu.es.gov.br/e-ouv" alt="e-ouv | Ibiraçu" style="color:{system_code_color}"
												target="_blank">
												ouvidoria.
											</a>
										</p>
									</td>
								</tr> -->

								<!-- <tr bgcolor="#f1f1f1">
									<td style="padding:15px 10px 0px 10px;font-family:'proxima-nova',sans-serif" align="left">
										<p style="padding:0px;color:#7e8790;margin:0;font-size:16px;text-align:center">
											<b>Ouvidoria</b> 0800 025 2000
										</p>
									</td>
								</tr> -->

								<!-- <tr bgcolor="#f1f1f1">
									<td style="padding:0px 10px 45px 10px;font-family:'proxima-nova',sans-serif" align="left">
										<p style="padding:0px;color:#7e8790;margin:0;font-size:12px;text-align:center">
											Prefeitura municipal de Ibira&ccedil;u
											<br>
											CNPJ 27.165.208/0001-17
										</p>
									</td>
								</tr> -->

							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>

	</div>

</body>

</html>
`;