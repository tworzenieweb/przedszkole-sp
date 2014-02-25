<?php global $SMTheme; ?>
  
</div></div>

<?php	
if ($SMTheme->get( 'social', 'showsocial')) {
	$SMTheme->block_social();
}
?>
<div id='content-bottom' class='container'></div>
<div id='footer'>
		<div class='container clearfix'>
			
			<?php if ($SMTheme->get("layout","footerwidgets")) { ?>
			<div class='footer-widgets-container'><div class='footer-widgets'>
				<div class='widgetf'>
					<?php 
					if ( !function_exists("dynamic_sidebar") || !dynamic_sidebar("footer_1") ) {
						;
					} ?>
				</div>
				
				<div class='widgetf'>
					<?php 
					if ( !function_exists("dynamic_sidebar") || !dynamic_sidebar("footer_2") ) {
						;
					} ?>
				</div>
				
				<div class='widgetf widgetf_last'>
					<?php if ( !function_exists("dynamic_sidebar") || !dynamic_sidebar("footer_3") ) {
						;
					} ?>
				</div>
			</div></div>
			<?php } ?>
			<div class='footer_txt'>
				<div class='top_text'>
				<?php
                    if ($SMTheme->get( "layout","footertext" )) {
                        echo $SMTheme->get( "layout","footertext" );
                    } else { 
                        ?>Wszystkie Prawa Zastrzeżone <a href="<?php echo home_url(); ?>"><?php bloginfo("name"); ?></a><?php
						echo (get_bloginfo('description'))?' - '.get_bloginfo('description'):'';
                    }
                ?> <?php echo date("Y"); ?> 
				</div>
				<?php /* 
					All links in the tag <div class='smthemes'> are attribution of the theme developers and should remain intact. 
					It's protected by Creative Commons License (http://creativecommons.org/licenses/by/3.0/).
					Warning! Your site will not be able to work if these links are edited or deleted.
					You can buy this theme without footer links online at http://smthemes.com/buy/beautysecrets/
				*/ ?>
				<!--
    
    <div class='smthemes'>Designed by <a href='http://www.fwpthemes.com/' target='_blank'>Professional WordPress Themes</a>, thanks to: <a href='http://www.streamline-surgical.com' target='_blank'>gastric band</a>, <a href='http://emedicinal.com/green-coffee-bean' target='_blank'>green coffee bean extract</a> and <a href='http://dezumidificam.ro' target='_blank'>dezumidificatoare</a></div>
                                
                                
                                -->
			</div>
		</div>
		
		
		<?php wp_footer(); ?>

	</div> <?php //footer ?>
</div> <?php //all ?>
<!--
<?php
	echo $SMTheme->get( "integration","footercode" );
?>
-->
</body>
</html>