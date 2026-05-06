package com.inswave.training.health.controller;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebSquareLegacyController {

    private static final String DEFAULT_LANG = "ko";
    private static final String DEFAULT_PATTERN = "yyyyMMddHHmmssSSS";

    @GetMapping({"/serverTime.wq", "/websquare/serverTime.wq"})
    public ResponseEntity<String> getServerTime(
            @RequestParam(name = "pattern", defaultValue = DEFAULT_PATTERN) String pattern) {
        DateTimeFormatter formatter;
        try {
            formatter = DateTimeFormatter.ofPattern(pattern, Locale.ROOT);
        } catch (Exception ex) {
            formatter = DateTimeFormatter.ofPattern(DEFAULT_PATTERN, Locale.ROOT);
        }
        String now = OffsetDateTime.now().format(formatter);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(now);
    }

    @GetMapping({"/serverTimeZone.wq", "/websquare/serverTimeZone.wq"})
    public ResponseEntity<String> getServerTimeZone() {
        int offsetMinutes = ZoneId.systemDefault().getRules()
                .getOffset(OffsetDateTime.now().toInstant()).getTotalSeconds() / 60;
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(String.valueOf(offsetMinutes));
    }

    @GetMapping({"/message/getLanguagePack/{lang}", "/langpack/{lang}.js"})
    public ResponseEntity<Void> getLanguagePack(@PathVariable String lang) {
        String resolved = (lang != null && (lang.equalsIgnoreCase("en") || lang.equalsIgnoreCase("ko") || lang.equalsIgnoreCase("ch")))
                ? lang.toLowerCase(Locale.ROOT) : DEFAULT_LANG;
        return ResponseEntity.status(HttpStatus.FOUND)
                .cacheControl(CacheControl.noStore())
                .header(HttpHeaders.LOCATION, "/websquare/_websquare_/message/" + resolved + ".js")
                .build();
    }
}
